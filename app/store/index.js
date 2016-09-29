import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware
    )
  );
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
