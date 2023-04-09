// express
const express = require('express');
// eslint-disable-next-line new-cap
const polygonRouter = express.Router();

// controller
const polygonController = require('../controllers/polygonController');

// middlewares
const jwtChecker = require('../middlewares/jwtChecker');
const validateGeojson = require('../middlewares/validator');

polygonRouter.get('/', jwtChecker, polygonController.list);
polygonRouter.get('/:id', jwtChecker, polygonController.view);
polygonRouter.post('/create', jwtChecker, validateGeojson, polygonController.create);
polygonRouter.put('/update', jwtChecker, validateGeojson, polygonController.update);
polygonRouter.delete('/delete', jwtChecker, polygonController.delete);
polygonRouter.get('/search/:id', jwtChecker, polygonController.search);

module.exports = polygonRouter;
