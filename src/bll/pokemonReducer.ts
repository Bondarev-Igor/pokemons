// eslint-disable-next-line import/no-cycle
import { getPokemons } from 'api/pokemonApi';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import { AppRootStateType } from './store';

export type PokemonType = {
  id : number
  name : string;
  image : string;
};

export type PokStateType = {
  count : null | number;
  next : null | string;
  previous : null | string;
  results : null | PokemonType[];
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
      return { ...state, results: [...action.pokemons] };
    default:
      return state;
  }
};

export type SetPokemonsACType = {
  type: 'SET-POKEMONS';
  pokemons: PokemonType[];
};

export const setPokemonsAC = (pokemons: PokemonType[]) => ({ type: 'SET-POKEMONS', pokemons } as const);

export const fetchPokemonsTC = (): ThunkAction<void, AppRootStateType, unknown, ActionType> => (
  dispatch: Dispatch,
) => {
  getPokemons()
    .then((res) => {
      const newPokemonsData:PokemonType[] = [];
      res.data.results.forEach((pokemon, index: number) => {
        newPokemonsData[index] = {
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        };
      });
      dispatch(setPokemonsAC(newPokemonsData));
    });
};

export default pokemonsReducer;
