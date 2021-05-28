import { combineReducers,  createStore } from 'redux'
import pokemonReducer from './pokemonReducer'

const rootReducer = combineReducers({
    pokemons: pokemonReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>