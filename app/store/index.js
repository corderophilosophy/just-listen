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
  return createStore(rootReducer, initialState, enhancer);
}
