import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
  return store;
}
