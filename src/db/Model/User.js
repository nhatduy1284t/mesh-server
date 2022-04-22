let mongoose = require('../index');

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    role: { type: String },
  },
  { collection: 'User' }
);

var User = mongoose.model('User', userSchema);

module.exports = User;
