import questionReducer from './questions';
import * as ActionType from '../actions/questions';

describe('Reducer::Question', function () {
  it('returns an empty array as default state', function () {
    let action   = {type: 'unknown'};
    let newState = questionReducer(undefined, action);
    expect(newState.toJS()).to.deep.equal([]);
  });

  describe('on QUESTIONS_LOADED', function () {
    it('returns the `response` in given action', function () {
      let action   = {
        type    : ActionType.QUESTIONS_LOADED,
        response: {responseKey: 'responseVal'}
      };
      let newState = questionReducer(undefined, action);
      expect(newState.toJS()).to.deep.equal(action.response);
    });
  });
});
