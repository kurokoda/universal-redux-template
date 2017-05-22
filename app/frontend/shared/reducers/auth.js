import Immutable from 'immutable';
import * as ActionType from '../actions/Auth';
import {REHYDRATE} from 'redux-persist/constants';

const defaultState = Immutable.fromJS({});

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.LOG_IN:
      debugger;
      return state.merge({loggedIn: true});
    case ActionType.LOG_OUT:
      return state.merge({loggedIn: false});
    case REHYDRATE:
      return Immutable.fromJS(action.payload.auth) || state;
    default:
      return state;
  }
}

export default authReducer;
