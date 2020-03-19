import _ from 'lodash';

import { UPDATE_INSTRUMENT } from '../constants/action-types';

export const initialState = {
  instrument: {}
};

const instrumentReducer = (state = initialState, action: any) => {
  if (action.type === UPDATE_INSTRUMENT) {
    return Object.assign({}, state, {
      instrument: _.merge({}, state.instrument, action.payload)
    });
  }
  return state;
};

export default instrumentReducer;
