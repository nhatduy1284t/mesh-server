const mongoose = require('mongoose');
const express = require("express")
mongoose.connects = async function () {
  try {
    const app= express();
    app.use(express.json())
    await mongoose.connect('mongodb://localhost:27017/mesh', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connect successfully!');
  } catch (error) {
    console.log('Connect fail!');
  }
};

module.exports = mongoose;
