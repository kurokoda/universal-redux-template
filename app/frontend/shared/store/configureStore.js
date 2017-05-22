import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';
import DevTools from '../components/DevTools';
import {updateIsRehydrated} from '../actions/Application';
import {localForage} from 'localforage';

const logger = createLogger({
  level    : 'info',
  collapsed: false,
  logger   : console,
  predicate: (getState, action) => true
});

let middlewares = [
  thunkMiddleware,
  apiMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

let store;

export default function configureStore(initialState) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      DevTools.instrument()
    )
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  if (typeof self === 'object') {
    persistStore(store, {
        blacklist : ['application'],
        storage   : localForage,
        transforms: [immutableTransform()]
      },
      function () {
        store.dispatch(updateIsRehydrated(true));
      }
    ).purge();
  }
  return store;
}
