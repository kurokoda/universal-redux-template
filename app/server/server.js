/* global __dirname */

import Express from 'express';
import path from 'path';
import compression from 'compression';
import clearRequireCacheOnChange from './lib/clearRequireCacheOnChange';
import session from 'express-session';

const server = new Express();
const port   = process.env.PORT || 3000;

server.use(compression());

server.set('trust proxy', 1); // trust first proxy
server.use(session({
  secret           : 'keyboard cat',
  resave           : false,
  saveUninitialized: true,
  cookie           : {secure: false}
}));

if (process.env.NODE_ENV === 'production') {
  server.use(Express.static(path.join(__dirname, '../..', 'public')));
} else {
  server.use(Express.static(path.join(__dirname, '../..', 'dist')));
  server.use('/assets', Express.static(path.join(__dirname, '..', 'assets')));
  clearRequireCacheOnChange({rootDir: path.join(__dirname, '..')});
}

require('./api/setRoutes').default(server);

server.set('views', path.join(__dirname, 'views'));

server.set('view engine', 'ejs');

server.use((err, req, res) => {
  // TODO report error here or do some further handlings
  res.status(500).send('something went wrong...');
});

// console.log(`Server is listening to port: ${port}`);
server.listen(port);