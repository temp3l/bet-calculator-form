import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

  return store;
}

// import { createStore } from 'redux';
// import rootReducer from '../reducers/index';

// const store = createStore(rootReducer);

// export default store;
