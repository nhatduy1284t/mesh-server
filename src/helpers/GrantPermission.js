const User = require('../db/Model/User');
const mongoose = require('../db/index');
mongoose.connects();

let grantPermission = (username) => {
  User.findOneAndUpdate({ username: username }, { $set: { role: 'admin' } }, { new: true }, (err, doc) => {
    if (err) {
      console.log('Something wrong when updating data!');
      console.log(err);
    }
    if (!doc) {
      console.log('User not found');
    } else console.log(`${doc.username} is now an admin`);
  });
};

function init() {
  const args = process.argv.slice(2);
  if (args.length != 1) {
    console.log('Input must be user name !');
    return;
  }
  grantPermission(args[0]);
}

init();
