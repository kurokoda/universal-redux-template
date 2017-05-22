import {CALL_API, CHAIN_API} from '../../../shared/middleware/api';

export const QUESTIONS_LOADED = Symbol('QUESTIONS_LOADED');
export const QUESTION_PURGED  = Symbol('QUESTION_LOADED');
export const QUESTION_LOADED  = Symbol('QUESTION_LOADED');
export const USER_LOADED      = Symbol('USER_LOADED');

export function loadQuestions() {
  return {
    [CALL_API]: {
      method     : 'get',
      path       : '/api/questions',
      successType: QUESTIONS_LOADED
    }
  };
}

export function loadQuestion({id, history}) {
  return {
    [CHAIN_API]: [
      () => {
        return {
          [CALL_API]: {
            method     : 'get',
            path       : `/api/questions/${id}`,
            successType: QUESTION_LOADED,
            afterError : () => {
              history.push('/');
            }
          }
        };
      },
      (question) => {
        return {
          [CALL_API]: {
            method     : 'get',
            path       : `/api/users/${question.userId}`,
            successType: USER_LOADED
          }
        };
      }
    ]
  };
}

export function purgeQuestion() {
  const type = QUESTION_PURGED;
  return {type};
}
