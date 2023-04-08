const express = require('express');
// eslint-disable-next-line new-cap
const searchRouter = express.Router();
const searchController = require('../controllers/searchController');

searchRouter.post('/circle', searchController.findEntities);

module.exports = searchRouter;
