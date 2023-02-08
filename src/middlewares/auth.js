const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../../config');

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).send('User is not authorized');
    }
    const decodedData = jwt.verify(token, SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (error) {
    return res.status(401).send('User is not authorized');
  }
}