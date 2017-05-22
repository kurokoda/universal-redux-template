export default (req, res) => {
  const {getQuestion} = require('./mockApi');
  const question      = getQuestion(req.params.id);
  if (question) {
    res.send(question);
  } else {
    res.status(404).send({reason: 'question not found'});
  }
};
