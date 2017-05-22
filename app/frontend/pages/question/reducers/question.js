import Immutable from 'immutable';
import * as ActionType from '../../questions/actions/questions';
import {REHYDRATE} from 'redux-persist/constants';

function getDefaultState() {
  return Immutable.fromJS({
    user: {}
  });
}

const defaultState = getDefaultState();

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionType.QUESTION_LOADED:
      return state.merge(action.response);
    case ActionType.USER_LOADED:
      return state.merge({user: action.response});
    case ActionType.QUESTION_PURGED:
      return getDefaultState();
    case REHYDRATE:
      return action.payload.question || state;
    default:
      return state;
  }
}
