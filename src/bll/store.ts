import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { takeEvery } from 'redux-saga/effects';
// eslint-disable-next-line import/no-cycle
import pokemonsReducer, { fetchPokemonsWorkerSaga } from './pokemonsReducer';
// import pokReducer, { fetchPokemonWorkerSaga } from './pokReducer';

const rootReducer = combineReducers({
  // pokemon: pokReducer,
  pokemons: pokemonsReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;

// eslint-disable-next-line max-len
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>;

function* rootWatcher() {
  yield takeEvery('FETCH_POKEMONS', fetchPokemonsWorkerSaga);
  // yield takeEvery('FETCH_POKEMON', fetchPokemonWorkerSaga);
}

sagaMiddleware.run(rootWatcher);
