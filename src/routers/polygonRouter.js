const express = require('express');
// eslint-disable-next-line new-cap
const polygonRouter = express.Router();
const polygonController = require('../controllers/polygonController');
const validateGeojson = require('../middlewares/validator');

polygonRouter.get('/', polygonController.getAll);
polygonRouter.get('/:id', polygonController.getUnique);
polygonRouter.get('/search/:id', polygonController.search);
polygonRouter.post('/new', validateGeojson, polygonController.postNew);
polygonRouter.put('/update', validateGeojson, polygonController.updateUnique);
polygonRouter.delete('/delete', polygonController.deleteUnique);

module.exports = polygonRouter;
