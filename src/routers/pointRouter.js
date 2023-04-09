// express
const express = require('express');
// eslint-disable-next-line new-cap
const pointRouter = express.Router();

// controller
const pointController = require('../controllers/pointController');

// middlewares
const validateGeojson = require('../middlewares/validator');
const jwtChecker = require('../middlewares/jwtChecker');

pointRouter.get('/', jwtChecker, pointController.list);
pointRouter.get('/:id', jwtChecker, pointController.view);
pointRouter.post('/create', jwtChecker, validateGeojson, pointController.create);
pointRouter.put('/update', jwtChecker, validateGeojson, pointController.update);
pointRouter.delete('/delete', jwtChecker, pointController.delete);
pointRouter.post('/distance', jwtChecker, pointController.getDistance);
pointRouter.post('/isin', jwtChecker, pointController.isIn);

module.exports = pointRouter;
