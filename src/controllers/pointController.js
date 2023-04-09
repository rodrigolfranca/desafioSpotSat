// service
const pointService = require('../service/pointService');

const pointController = {

    list: async (req, res) => {
        console.log('Points Controller: List');
        try {
            const data = await pointService.list();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    view: async (req, res) => {
        console.log('Points Controller: View');
        try {
            const {id} = req.params;
            const data = await pointService.view(id);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err});
        }
    },
    create: async (req, res) => {
        console.log('Points Controller: Create');
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await pointService.create(name, geom);
            return res.status(201).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    update: async (req, res) => {
        console.log('Points Controller: Updating one');
        const {id} = req.body;
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await pointService.view(id);
            if (data.geojson.features[0] !== req.body.geojson.features[0]) {
                try {
                    const novo = await pointService.update(id, name, geom);
                    return res.status(200).json(novo);
                } catch (err) {
                    return res.status(500).json({
                        message: 'Controller Error: failed access to database',
                        err: err,
                    });
                }
            } else {
                return res.status(400).json({
                    message: 'Update failed: Os dois geojsons são iguais.',
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err});
        }
    },
    delete: async (req, res) => {
        console.log('Points Controller: Delete');
        const {id} = req.body;
        try {
            data = pointService.delete(id);
            return res.status(200).json({message: 'Point deleted'});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    // determinar a distancia entre dois lugares (pontos)
    getDistance: async (req, res) => {
        console.log('Points Controller: Distance Between');
        const {id1, id2} = req.body;
        try {
            const data = await pointService.getDistance(id1, id2);
            // eslint-disable-next-line max-len
            if (!data) return res.status(400).json({'message': 'non-existent id'});
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    // verificar se um lugar(ponto) esta em uma área(poligono)
    isIn: async (req, res) => {
        console.log('Points Controller: Point in Polygon?');
        const {idPoint, idPolygon} = req.body;
        try {
            const data = await pointService.isIn(idPoint, idPolygon);
            // eslint-disable-next-line max-len
            if (!data) return res.status(400).json({'message': 'is out or non-exist'});
            return res.status(200).json({'message': 'is in'});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },

};

module.exports = pointController;
