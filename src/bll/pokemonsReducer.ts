// eslint-disable-next-line import/no-cycle
import { getPokemon, getPokemons } from 'api/pokemonApi';
import {
  all, call, CallEffect, put, PutEffect,
} from '@redux-saga/core/effects';

export type SimplePokType = {
  name: string;
  url: string;
};

type SpritesType = {
  back_default: null|string
  back_female: null|string
  back_shiny: null|string
  back_shiny_female: null|string
  front_default: null|string
  front_female: null|string
  front_shiny: null|string
  front_shiny_female: null|string
  other: {
    dream_world: {
      front_default: null|string
      front_female: null|string
    }
    ['official-artwork']: {
      front_default: null|string
    }
  }
};

type TypePokemon = {
  slot: number,
  type: {
    name: string
    url: string
  },
};

export type ServerPokemonType = {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: SpritesType;
  types: TypePokemon[];
  weight: number;
};

type DataType = {
  data: PokemonsDataType;
};

export type PokemonsDataType = {
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
): SetPokemonsACType => ({
  type: 'SET_POKEMONS', next, previous, count, temp,
} as const);

// sagas
type ReturnFethcPokType = Generator<CallEffect<unknown> | PutEffect<{
  readonly type: 'SET_POKEMONS';
  readonly temp: SetPokemonsACType;
}>, void, DataType>;

export function* fetchPokemonsWorkerSaga({ startPoint, count }: any): any {
  // eslint-disable-next-line no-debugger
  debugger;
  try {
    const pokemons = yield call(() => getPokemons(startPoint, count));
    const temp = [...pokemons.data.results];
    const getPok = async (item: SimplePokType) => {
      // eslint-disable-next-line no-debugger
      debugger;
      const res = await getPokemon(item.name);
      const index = temp.findIndex((_item) => _item.url === item.url);
      temp[index] = res.data;
    };

    yield all(temp.map((el) => call(getPok, el)));
    yield put(setPokemonsAC(
      pokemons.data.count,
      pokemons.data.next,
      pokemons.data.previous,
      temp,
    ));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export const fetchPokemons = (
  startPoint: number, count: number,
): { type: string, startPoint: number, count: number; } => ({ type: 'FETCH_POKEMONS', startPoint, count });

// thunks
// type FetchPokemonTCType = ThunkAction<void, AppRootStateType, unknown, ActionType>;
// export const fetchPokemonsTC = (startPoint: number, count: number): FetchPokemonTCType => async (
//   dispatch: Dispatch,
// ) => {
//   const pokemons = await getPokemons(startPoint, count);
//   const temp = [...pokemons.data.results];
//   const getPok = async (item: any) => {
//     // // eslint-disable-next-line no-debugger
//     // debugger;
//     const res = await getPokemon(item.name);
//     const index = temp.findIndex((_item: any) => _item.url === item.url);
//     temp[index] = res.data;
//   };
//   const newPoks: any = async () => temp.map(getPok);
//   dispatch(setPokemonsAC(
//     pokemons.data.count,
//     pokemons.data.next,
//     pokemons.data.previous,
//     newPoks,
//   ));
// };

export default pokemonsReducer;
