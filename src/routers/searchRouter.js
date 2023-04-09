// express
const express = require('express');
// eslint-disable-next-line new-cap
const searchRouter = express.Router();

// controller
const searchController = require('../controllers/searchController');

// middlewares
const jwtChecker = require('../middlewares/jwtChecker');

searchRouter.post('/circle', jwtChecker, searchController.findEntities);

module.exports = searchRouter;
