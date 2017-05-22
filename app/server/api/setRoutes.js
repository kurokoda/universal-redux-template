export default (server) => {
  server.post('/api/login', (req, res) => {
    require('./login').default(req, res);
  });
  server.get('/api/session-state', (req, res) => {
    require('./sessionState').default(req, res);
  });

  server.get('/api/questions', (req, res) => {
    require('./getQuestions').default(req, res);
  });

  server.get('/api/questions/:id', (req, res) => {
    require('./getQuestion').default(req, res);
  });

  server.get('/api/users/:id', (req, res) => {
    require('./getUser').default(req, res);
  });

  server.get('*', (req, res, next) => {
    require('./universalRenderer').default(req, res, next);
  });
};
