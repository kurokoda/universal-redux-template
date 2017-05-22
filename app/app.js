/* global __REDUX_STATE__ */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import configureStore from './frontend/shared/store/configureStore';
import createRoutes from 'frontend/shared/routes/router';
import {Provider} from 'react-redux';
import Immutable from 'immutable';
import superAgent from 'superagent';
import _ from 'lodash';

const reduxState = {};

if (window.__REDUX_STATE__) {
  try {
    const plain = JSON.parse(decodeURI(__REDUX_STATE__));
    _.each(plain, (val, key) => {
      reduxState[key] = Immutable.fromJS(val);
    });
  } catch (e) {
    new Error('There was an error retriiving the redux state');
  }
}

superAgent.get('/api/session-state')
.end((err, res) => {
  if (err) {
    // handle error
  } else {
    const sessionData = JSON.parse(res.text);
    const plain = JSON.parse(res.text);
    _.each(sessionData, (val, key) => {
      sessionData[key] = Immutable.fromJS(val);
    });
    const store       = configureStore(_.merge(reduxState, sessionData));

    ReactDOM.render((
      <Provider store={store}>
        { createRoutes(browserHistory, store) }
      </Provider>
    ), document.getElementById('root'));
  }
});
