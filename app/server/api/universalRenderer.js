import Promise from 'bluebird';
import React from 'react';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import Immutable from 'immutable';
import _ from 'lodash';


import {match, RouterContext, useRouterHistory} from 'react-router';
import {createMemoryHistory, useQueries} from 'history';
import {Provider} from 'react-redux';

import createRoutes from '../../frontend/shared/routes/router';
import configureStore from '../../frontend/shared/store/configureStore';
import {getSessionState} from '../utils/session';

let scriptSrcs;
let styleSrc;

if (process.env.NODE_ENV === 'production') {
  const refManifest = require('../../../rev-manifest.json');
  scriptSrcs        = [
    `/${refManifest['vendor.js']}`,
    `/${refManifest['app.js']}`
  ];
  styleSrc          = `/${refManifest['main.css']}`;
} else {
  scriptSrcs = [
    'http://localhost:3001/static/vendor.js',
    'http://localhost:3001/static/dev.js',
    'http://localhost:3001/static/app.js'
  ];
  styleSrc   = '/main.css';
}

export default (req, res, next) => {
  console.log(process.env.API_BASE_URL)
  const history      = useRouterHistory(useQueries(createMemoryHistory))();
  const sessionState = getSessionState(req.session);
  _.each(sessionState, (val, key) => {
    sessionState[key] = Immutable.fromJS(val);
  });
  const store    = configureStore(sessionState);
  const routes   = createRoutes(history, store);
  const location = history.createLocation(req.url);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (!renderProps) return; // TODO just make it so that the favicon loads and get rid of this
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      const [getCurrentUrl, unsubscribe] = subscribeUrl();
      const reqUrl                       = location.pathname + location.search;

      getReduxPromise(renderProps).then(() => {
        let state        = store.getState();
        const reduxState = escape(JSON.stringify(state));
        const html       = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );
        const metaHeader = Helmet.rewind();

        if (getCurrentUrl() === reqUrl) {
          res.render('index', {metaHeader, html, scriptSrcs, reduxState, styleSrc});
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();
      })
      .catch((err) => {
        Helmet.rewind();
        unsubscribe();
        next(err);
      });
    }
  });

  function getReduxPromise(renderProps) {
    const {query, params} = renderProps;
    const comp            = renderProps.components[renderProps.components.length - 1].WrappedComponent;
    return comp.fetchData ?
      comp.fetchData({query, params, store, history}) :
      Promise.resolve();
  }

  function subscribeUrl() {
    let currentUrl = location.pathname + location.search;

    const unsubscribe = history.listen((newLoc) => {
      if (newLoc.action === 'PUSH' || newLoc.action === 'REPLACE') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });
    return [
      () => currentUrl,
      unsubscribe
    ];
  }
};
