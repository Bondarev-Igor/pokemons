export type PokemonType = {
  'name': string;
  'url': string;
};

export type PokStateType = {
  'count' : null | number
  'next' : null | string
  'previous' : null | string
  'results' : null | PokemonType[]
};

const initialState: PokStateType = {
  count: null,
  next: null,
  previous: null,
  results: null,
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
  type: 'SET-POKEMONS'
  pokemons: Array<PokemonType>
};

export const setPokemonsAC = (pokemons: PokemonType[]) => ({ type: 'SET-POKEMONS', pokemons } as const);

export default pokemonsReducer;
