const mongoose = require('mongoose');

mongoose.connects = async function() {
    try {
      await mongoose.connect('mongodb://localhost:27017/mesh');
      console.log('Connect successfully!');
    } catch (error) {
      console.log('Connect fail!');
    }
};

module.exports = mongoose;
//   const userSchema = new mongoose.Schema(
//     {
//       firstName: String,
//       lastName: String,
//     },
//     { collection: 'User' }
//   );
//   var User = mongoose.model('User', userSchema);
  
//   let userToBeStored = new User({
//     firstName: 'Jamie',
//     lastName: 'Munro',
//   });
  
