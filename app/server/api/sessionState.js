import {getSessionState} from '../utils/session';

export default (req, res) => {
  res.send(getSessionState(req.session));
};
