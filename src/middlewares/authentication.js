const jwt = require('jsonwebtoken');
const { PRIVATE_USER_KEY, PRIVATE_ADMIN_KEY } = require('../utils/Settings');

let verifyToken = (req, res, next) => {
  let result;
  let token = req.headers.token;
  jwt.verify(token, PRIVATE_USER_KEY, function (err, decoded) {
    if (err) {
      result = {
        message: err.message,
        status: 400,
        valid: false,
      };
    } else
      result = {
        message: 'success',
        status: 200,
        valid: true,
        role: 'user',
      };
  });

  if (!result.valid) {
    res.send(result);
  }

  req.payload = {
    result: result,
  };

  next();
};

let verifyTokenAdmin = (req, res, next) => {
  let result;
  let token = req.headers.token;
  jwt.verify(token, PRIVATE_ADMIN_KEY, function (err, decoded) {
    if (err) {
      result = {
        message: err.message,
        status: 400,
        valid: false,
      };
    } else {
      result = {
        message: 'success',
        status: 200,
        valid: true,
        role: 'admin',
      };
    }
  });

  if (!result.valid) {
    res.send(result);
  }

  req.payload = {
    result: result,
  };

  next();
};

module.exports = { verifyToken, verifyTokenAdmin };
