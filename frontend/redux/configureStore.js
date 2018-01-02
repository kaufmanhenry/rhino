import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from './middleware/api';

import rootReducer from './modules';

const composeEnhancers = typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose); // eslint-disable-line

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, apiMiddleware))
  );
}
