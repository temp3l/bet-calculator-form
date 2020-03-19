import { combineReducers } from 'redux';
import socket from './socket';
import articleReducer from './article-reducer';
import instrumentReducer from './instrument-reducer';

const rootReducer = combineReducers({
  socket,
  articleReducer,
  instrumentReducer
});

export default rootReducer;
