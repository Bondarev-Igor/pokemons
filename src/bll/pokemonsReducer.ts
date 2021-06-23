// eslint-disable-next-line import/no-cycle
import { getPokemons } from 'api/pokemonApi';
import {
  call, CallEffect, put, PutEffect,
} from '@redux-saga/core/effects';

export type ServerPokemonType = {
  name: string;
  url: string;
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
        results: [...action.pokemons],
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
  pokemons: ServerPokemonType[];
};

export const setPokemonsAC = (
  count: number,
  next: string,
  previous: string,
  pokemons: ServerPokemonType[],
): SetPokemonsACType => ({
  type: 'SET_POKEMONS', next, previous, count, pokemons,
} as const);

// sagas
type ReturnFethcPokType = Generator<CallEffect<unknown> | PutEffect<{
  readonly type: 'SET_POKEMONS';
  readonly pokemons: ServerPokemonType[];
}>, void, DataType>;
export function* fetchPokemonsWorkerSaga({ startPoint, count }: any): ReturnFethcPokType {
  try {
    const pokemons = yield call(() => (getPokemons(startPoint, count)));
    const temp = [...pokemons.data.results];
    console.log(temp);
    yield put(setPokemonsAC(
      pokemons.data.count,
      pokemons.data.next,
      pokemons.data.previous,
      pokemons.data.results,
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
