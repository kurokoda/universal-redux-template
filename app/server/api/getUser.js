export default (req, res) => {
  const {getUser} = require('./mockApi');
  res.send(getUser(req.params.id));
};
