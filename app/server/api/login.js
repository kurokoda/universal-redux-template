export default (req, res) => {
  req.session.loggedIn = true;
  res.send('SUCCESS');
};
