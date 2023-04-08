const pointService = require('../service/pointService');

const pointController = {

    getAll: async (req, res) => {
        console.log('Points Controller: List');
        try {
            const data = await pointService.selectAll();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    getUnique: async (req, res) => {
        console.log('Points Controller: View');
        try {
            const {id} = req.params;
            const data = await pointService.selectOne(id);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err});
        }
    },
    postNew: async (req, res) => {
        console.log('Points Controller: Create');
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await pointService.insertOne(name, geom);
            return res.status(201).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    updateUnique: async (req, res) => {
        console.log('Points Controller: Updating one');
        const {id} = req.body;
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await pointService.selectOne(id);
            if (data.geojson.features[0] !== req.body.geojson.features[0]) {
                try {
                    const novo = await pointService.updateOne(id, name, geom);
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
    deleteUnique: async (req, res) => {
        console.log('Points Controller: Delete');
        const {id} = req.body;
        try {
            data = pointService.deleteOne(id);
            return res.status(200).json({message: 'Point deleted'});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
};

module.exports = pointController;
