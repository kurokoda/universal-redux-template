import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import {requestRoute} from '../actions/Application';
import App from '../containers/App';
import HomeContainer from '../../pages/home/HomeContainer';
import LoginPage from '../../pages/login/LoginPage';
import QuestionsPage from '../../pages/questions/QuestionsPage';
import Question from '../../pages/question/QuestionPage';

export default function routes(history, store) {
  function isAuthorized() {
    try {
      return getStore().getState().auth.get('loggedIn');
    } catch (error) {
      return false;
    }
  }

  function replaceIfUnauthorized(nextState, replace) {
    if (!isAuthorized()) {
      getStore().dispatch(requestRoute(nextState.location.pathname));
      replace({
        pathname: '/login'
      });
    }
  }

  let getStore = () => {
    return store;
  };

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={LoginPage}/>
        <Route path="questions" component={QuestionsPage} onEnter={replaceIfUnauthorized}/>
        <Route path="questions/:id" component={Question}/>
        <IndexRoute component={HomeContainer}/>
      </Route>
    </Router>
  );
}
