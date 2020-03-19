import uniqid from 'uniqid';
import { ADD_ARTICLE } from '../constants/action-types';

export const initialState = {
  articles: []
};

const rootReducer = (state = initialState, action: any) => {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(Object.assign({}, action.payload, { id: uniqid() }))
    });
  }
  return state;
};

export default rootReducer;
