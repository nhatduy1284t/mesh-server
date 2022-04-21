const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const authentication = require('../middlewares/authentication');
//Need admin token to use these
router.use(authentication.verifyTokenAdmin);
router.use('/users', adminController.getUsers);

module.exports = router;
