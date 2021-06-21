// eslint-disable-next-line import/no-cycle
import { getPokemons } from 'api/pokemonApi';
import {
  call, CallEffect, put, PutEffect,
} from '@redux-saga/core/effects';
import axios from 'axios';

export type PokemonType = {
  id: number;
  name: string;
  image: string;
};

export type PokStateType = {
  count: null | number;
  next: null | string;
  previous: null | string;
  results: null | PokemonType[];
};

type ServerPokemonType = {
  name: string;
  url: string;
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
  pokemons: PokemonType[];
};

export const setPokemonsAC = (
  count: number,
  next: string,
  previous: string,
  pokemons: PokemonType[],
) => ({
  type: 'SET-POKEMONS', next, previous, count, pokemons,
} as const);

// sagas
export function* initializePokemonsWorkerSaga(): Generator<CallEffect<unknown> | PutEffect<{
  readonly type: 'SET-POKEMONS';
  readonly pokemons: PokemonType[];
}>, void, DataType> {
  const pokemons = yield call(() => getPokemons());
  const newPokemonsData: PokemonType[] = [];
  pokemons.data.results.forEach((pokemon: ServerPokemonType, index: number) => {
    newPokemonsData[index] = {
      id: index + 1,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
    };
  });
  yield put(setPokemonsAC(
    pokemons.data.count,
    pokemons.data.next,
    pokemons.data.previous,
    newPokemonsData,
  ));
}

export const fetchPokemons = (): { type: string; } => ({ type: 'INITIALIZE_POKEMONS' });

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
