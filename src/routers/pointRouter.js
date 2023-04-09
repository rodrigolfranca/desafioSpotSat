const express = require('express');
// eslint-disable-next-line new-cap
const pointRouter = express.Router();
const pointController = require('../controllers/pointController');
const validateGeojson = require('../middlewares/validator');

pointRouter.get('/', pointController.getAll);
pointRouter.get('/:id', pointController.getUnique);
pointRouter.post('/new', validateGeojson, pointController.postNew);
pointRouter.post('/distance', pointController.getDistance);
pointRouter.post('/isin', pointController.isIn);
pointRouter.put('/update', validateGeojson, pointController.updateUnique);
pointRouter.delete('/delete', pointController.deleteUnique);

module.exports = pointRouter;
