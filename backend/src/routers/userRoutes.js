const express = require('express');
const userRouter = express.Router();
const {
    checkSignupip,
    CheckUser
} = require('../middleware/usermidware')

const {
    SignUp,
    Signin
} = require('../controllers/userController')

userRouter.post('/Signup', checkSignupip,CheckUser, SignUp);
userRouter.post('/Signin', Signin);

module.exports = userRouter;