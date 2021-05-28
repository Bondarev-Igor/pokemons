
export type PokemonType = {
  'name': string;
  'url': string;
};

export type AppRootStateTye = {
    "count" : null | number
    "next" : null | string
    "previous" : null | string
    "results" : null | PokemonType[]
}

const initialState: AppRootStateTye = {
    "count": null,
    "next" : null,
    "previous" : null,
    "results" : null,
};

type ActionType = SetPokemonsACType

const pokemonsReducer = (state: AppRootStateTye = initialState, action: ActionType): AppRootStateTye => {
  switch (action.type) {
    case "SET-POKEMONS":
       return { ...state, results: [...action.pokemons] };
    default:
        return state
  }
};

export type SetPokemonsACType = {
    type: "SET-POKEMONS"
    pokemons: Array<PokemonType>
}

export const setPokemonsAC = (pokemons: PokemonType[]) => {
  return { type: "SET-POKEMONS", pokemons } as const;
};

export default pokemonsReducer;
