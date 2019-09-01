const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenStrings = token ? token.split(' ') : [];

  !token && res.status(401).json({ message: 'Missing Authorization header' });

  if (tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[1]) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Error verifying token', error: err });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: 'Invalid scheme, or no token after scheme name' });
  }
};
