// eslint-disable-next-line import/no-cycle
import { getPokemons } from 'api/pokemonApi';
import {
  call, CallEffect, put, PutEffect,
} from '@redux-saga/core/effects';

export type ServerPokemonType = {
  name: string;
  url: string;
};

export type PokStateType = {
  count: null | number;
  next: null | string;
  previous: null | string;
  results: null | ServerPokemonType[];
};

type DataType = {
  data: PokemonsDataType;
};

type PokemonsDataType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: ServerPokemonType[];
};

const initialState: PokStateType = {
  count: null,
  next: null,
  previous: null,
  results: [],
};

type ActionType = SetPokemonsACType;

const pokemonsReducer = (state: PokStateType = initialState, action: ActionType): PokStateType => {
  switch (action.type) {
    case 'SET-POKEMONS':
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
  type: 'SET-POKEMONS';
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
) => ({
  type: 'SET-POKEMONS', next, previous, count, pokemons,
} as const);

// sagas
// eslint-disable-next-line max-len
export function* fetchPokemonsWorkerSaga({ url }: any): Generator<CallEffect<unknown> | PutEffect<{
  readonly type: 'SET-POKEMONS';
  readonly pokemons: ServerPokemonType[];
}>, void, DataType> {
  // eslint-disable-next-line no-debugger
  debugger;
  const pokemons = yield call(() => (getPokemons(url)));
  yield put(setPokemonsAC(
    pokemons.data.count,
    pokemons.data.next,
    pokemons.data.previous,
    pokemons.data.results,
  ));
}

export const fetchPokemons = (url: string): { type: string, url: string } => ({ type: 'FETCH_POKEMONS', url });

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
