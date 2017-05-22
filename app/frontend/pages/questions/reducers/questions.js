import Immutable from 'immutable';

import * as ActionType from '../actions/questions';

const defaultState = Immutable.fromJS([]);

function questionsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.QUESTIONS_LOADED:
      return Immutable.fromJS(action.response);
    default:
      return state;
  }
}

export default questionsReducer;
