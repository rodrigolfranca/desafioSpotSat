const express = require('express');
// eslint-disable-next-line new-cap
const polygonRouter = express.Router();

polygonRouter.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Say hello to my little friend! TRADADADADADADAD',
    });
});

module.exports = polygonRouter;
