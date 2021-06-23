export {};
// import { call, put } from '@redux-saga/core/effects';
// // eslint-disable-next-line import/no-cycle
// import { getPokemons } from 'api/pokemonApi';

// export type PokemonType = {
//   id: number | null;
//   name: string | null;
//   height: number | null;
//   weight: number | null;
//   base_experience: number | null;
//   typePokemon: string | null;
//   img: string | null;
// };

// const initialState: PokemonType = {
//   id: null,
//   name: null,
//   height: null,
//   weight: null,
//   base_experience: null,
//   typePokemon: null,
//   img: null,
// };

// type ActionType = SetPokemonActionType;

// const pokReducer = (state: PokemonType = initialState, action: ActionType): any => {
//   switch (action.type) {
//     case 'SET_POKEMON':
//       return {
//         ...state,
//         id: action.id,
//         name: action.name,
//         height: action.height,
//         weight: action.weight,
//         base_experience: action.base_experience,
//         typePokemon: action.type,
//         img: action.img,
//       };
//     default:
//       return state;
//   }
// };

// type SetPokemonActionType = {
//   type: 'SET_POKEMON',
//   id: number,
//   name: string,
//   height: number,
//   weight: number,
//   base_experience: number,
//   typePokemon: string,
//   img: string,
// };

// export const setPokemonAC = (
//   id: number,
//   name: string,
//   height: number,
//   weight: number,
//   base_experience: number,
//   typePokemon: string,
//   img: string,
// ): SetPokemonActionType => ({
//   type: 'SET_POKEMON',
//   id,
//   name,
//   height,
//   weight,
//   base_experience,
//   typePokemon,
//   img,
// } as const);

// // saga
// export function* fetchPokemonWorkerSaga({ url }: any): Generator<any, any, any> {
//   const pokemon = yield call(() => (getPokemons(url)));
//   console.log(pokemon);
//   yield put(setPokemonAC(
//     pokemon.data.data.id,
//     pokemon.data.data.name,
//     pokemon.data.data.height,
//     pokemon.data.data.weight,
//     pokemon.data.data.base_experience,
//     pokemon.data.data.typePokemon,
//     pokemon.data.data.sprites.other.dream_world.front_default,
//   ));
// }

// eslint-disable-next-line max-len
// export const fetchPokemon = (url: string): { type: string, url: string; } => ({ type: 'FETCH_POKEMON', url });

// export default pokReducer;
