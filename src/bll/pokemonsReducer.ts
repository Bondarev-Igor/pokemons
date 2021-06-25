// eslint-disable-next-line import/no-cycle
import { getPokemon, getPokemons } from 'api/pokemonApi';
import {
  call, CallEffect, put, PutEffect,
} from '@redux-saga/core/effects';

export type SimplePokType = {
  name: string
  url: string
};

export type ServerPokemonType = {
  base_experience: number
  height: number
  id: number
  name: string
  order: number
  sprites: string
  types: string
  weight: number
};

type DataType = {
  data: PokemonsDataType;
};

type PokemonsDataType = {
  count: null | number;
  next: null | string;
  previous: null | string;
  results: null | ServerPokemonType[];
};

const initialState: PokemonsDataType = {
  count: null,
  next: null,
  previous: null,
  results: [],
};

type ActionType = SetPokemonsACType;

// eslint-disable-next-line max-len
const pokemonsReducer = (state: PokemonsDataType = initialState, action: ActionType): PokemonsDataType => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return {
        ...state,
        count: action.count,
        next: action.next,
        previous: action.previous,
        results: [...action.temp],
      };
    default:
      return state;
  }
};

export type SetPokemonsACType = {
  type: 'SET_POKEMONS';
  count: number;
  next: string;
  previous: string;
  temp: ServerPokemonType[];
};

export const setPokemonsAC = (
  count: number,
  next: string,
  previous: string,
  temp: ServerPokemonType[],
): any => ({
  type: 'SET_POKEMONS', next, previous, count, temp,
} as const);

// sagas
type ReturnFethcPokType = Generator<CallEffect<unknown> | PutEffect<{
  readonly type: 'SET_POKEMONS';
  readonly pokemons: SimplePokType[];
}>, void, DataType>;

export function* fetchPokemonsWorkerSaga({ startPoint, count }: any): any {
  // eslint-disable-next-line no-debugger
  debugger;
  try {
    const pokemons = yield call(() => getPokemons(startPoint, count));
    const temp = [...pokemons.data.results];
    const getPok = async (item: any) => {
      // eslint-disable-next-line no-debugger
      debugger;
      const res = await getPokemon(item.name);
      const index = temp.findIndex((_item) => _item.url === item.url);
      temp[index] = res.data;
    };
    yield call(() => temp.forEach(getPok));
    yield call(() => console.log(temp));
    yield put(setPokemonsAC(
      pokemons.data.count,
      pokemons.data.next,
      pokemons.data.previous,
      temp,
    ));
  } catch (error) {
    console.log(error);
  }
}

export const fetchPokemons = (
  startPoint: number, count: number,
): { type: string, startPoint: number, count: number; } => ({ type: 'FETCH_POKEMONS', startPoint, count });

// thunks
// type FetchPokemonTCType = ThunkAction<void, AppRootStateType, unknown, ActionType>;
// export const fetchPokemonsTC = (): FetchPokemonTCType => (
//   dispatch: Dispatch,
// ) => {
//   getPokemons()
//     .then((res) => {
//       const newPokemonsData: PokemonType[] = [];
//       res.data.results.forEach((pokemon, index: number) => {
//         newPokemonsData[index] = {
//           id: index + 1,
//           name: pokemon.name,
//           image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
//         };
//       });
//       dispatch(setPokemonsAC(newPokemonsData));
//     });
// };

export default pokemonsReducer;
