const mongoose = require('mongoose');
const express = require("express")
mongoose.connects = async function () {
  try {
    await mongoose.connect('mongodb://localhost:27017/mesh');
    console.log('Connect successfully!');
  } catch (error) {
    console.log('Connect fail!');
  }
};

module.exports = mongoose;
