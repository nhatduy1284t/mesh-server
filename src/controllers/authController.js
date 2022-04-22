const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../db/Model/User');
const { PRIVATE_USER_KEY, PRIVATE_ADMIN_KEY } = require('../utils/Settings');

let generateToken = (dataGenerate, privateKey, time) => {
  let expiredTime = time + 's';
  var token = jwt.sign(
    {
      data: dataGenerate,
    },
    privateKey,
    { expiresIn: expiredTime }
  );
  console.log('token', token);

  return token;
};

let verifyToken = (token) => {
  let result;
  jwt.verify(token, PRIVATE_USER_KEY, function (err, decoded) {
    if (err) {
      result = {
        message: err.message,
        status: 400,
      };
    } else
      result = {
        message: 'success',
        status: 200,
      };
  });
  return result;
};

exports.checkAccount = async (user) => {
  try {
    let userDatabase = await User.findOne({ username: user.username });

    if (!userDatabase) {
      throw new Error('User not found !');
    }

    if (bcrypt.compareSync(user.password, userDatabase.password)) {
      console.log('Password login correct!');
      return generateToken(user.username);
    }

    throw new Error('Password is not correct');
  } catch (error) {
    console.log('error login', error);
    return {
      error: error.message,
    };
  }
};

exports.register = async (req, res, next) => {
  let { username, password } = req.body;
  let userRegister = new User({ username, password,role:"user" });
  try {
    let user = await User.findOne({ username: userRegister.username });

    if (user) {
      throw new Error('User already exists');
    }

    userRegister.password = bcrypt.hashSync(userRegister.password, bcrypt.genSaltSync(10));
    await userRegister.save();
    res.status(200).send('Register successfully!');
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
};



exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let user = { username, password };
    let userDatabase = await User.findOne({ username: user.username });

    if (!userDatabase) {
      throw new Error('User not found !');
    }
    console.log(userDatabase);
    if (bcrypt.compareSync(user.password, userDatabase.password)) {
      if (userDatabase._doc.role === 'admin') {
        return res.status(200).send({ token: generateToken(user.username, PRIVATE_ADMIN_KEY, 500) });
      }
      return res.status(200).send({ token: generateToken(user.username, PRIVATE_USER_KEY, 20) });
    }

    throw new Error('Password is not correct');
  } catch (error) {
    console.log('error login', error);

    return res.json({ error: error.message });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    let result = req.payload.result;
    res.status(result.status).send(result);
  } catch (error) {
    res.send(error);
  }
};

