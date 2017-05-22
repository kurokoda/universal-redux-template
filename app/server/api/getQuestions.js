export default (req, res) => {
  const {questions} = require('./mockApi');
  res.send(questions);
};
