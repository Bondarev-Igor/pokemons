import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof rootReducer>;
