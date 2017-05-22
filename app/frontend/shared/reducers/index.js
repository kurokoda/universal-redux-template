import {combineReducers} from 'redux';
import application from './application';
import auth from './auth';
import questions from '../../pages/questions/reducers/questions';
import question from '../../pages/question/reducers/question';

const rootReducer = combineReducers({
  application,
  auth,
  question,
  questions
});

export default rootReducer;
