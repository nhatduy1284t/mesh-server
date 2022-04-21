const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

const authentication = require("../middlewares/authentication");



router.post('/login',authController.login)
router.post('/register',authController.register)

//Need user token to use these
router.use(authentication.verifyToken);
router.get('/profile',authController.getProfile)


module.exports = router;