const express = require('express');
// eslint-disable-next-line new-cap
const userRouter = express.Router();

// controller
const userController = require('../controllers/userController');

userRouter.post('/login', userController.login);

module.exports = userRouter;
