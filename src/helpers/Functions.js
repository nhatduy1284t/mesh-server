
const fs = require('fs');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../db/Model/User');

function generateToken(dataGenerate) {
  let privateKey = 'mesh';
  let expiredTime = '20s';
  var token = jwt.sign(
    {
      data: dataGenerate,
    },
    privateKey,
    { expiresIn: expiredTime }
  );
  console.log('token', token);

  return token;
}

function verifyToken(token) {
  let result;
  jwt.verify(token, 'mesh', function (err, decoded) {
    if (err) {
      result = {
        message: err.message,
        status: false,
      };
    } else
      result = {
        status: true,
      };
  });
  return result;
}

async function checkAccount(user) {
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
      error:error.message
    };
  }
}

async function createAccount(account) {
  console.log(account);
  try {
    let user = await User.findOne({ username: account.username });

    if (user) {
      throw new Error('User already exists');
    }

    account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(10));
    await account.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { checkAccount, createAccount, verifyToken };
