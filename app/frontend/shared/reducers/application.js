import Immutable from 'immutable';

import * as ActionType from '../actions/Application';
import {REHYDRATE} from 'redux-persist/constants';

const defaultState = Immutable.fromJS({});

function applicationReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ROUTE_REQUESTED:
      return state.merge({routeRequested: action.route});
    case ActionType.UPDATE_IS_LOADING:
      return state.merge({isLoading: action.isLoading});
    case ActionType.UPDATE_IS_REHYDRATED:
      return state.merge({isRehydrated: true});
    case ActionType.SHOW_MODAL:
      return state.merge({modalContent: action.modalContent});
    case ActionType.HIDE_MODAL:
      return state.delete('modalContent');
    case REHYDRATE:
      return action.payload.application || state;
    default:
      return state;
  }
}

export default applicationReducer;
