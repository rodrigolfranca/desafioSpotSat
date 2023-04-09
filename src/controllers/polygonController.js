const polygonService = require('../service/polygonService');

const polygonController = {

    list: async (req, res) => {
        console.log('Polygons Controller: List');
        try {
            const data = await polygonService.list();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    view: async (req, res) => {
        console.log('Polygons Controller: View');
        try {
            const {id} = req.params;
            const data = await polygonService.view(id);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err});
        }
    },
    create: async (req, res) => {
        console.log('Polygons Controller: Create');
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await polygonService.create(name, geom);
            return res.status(201).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    update: async (req, res) => {
        console.log('Polygons Controller: Updating one');
        const {id} = req.body;
        const name = req.body.geojson.features[0].properties.name;
        const geom = req.body.geojson.features[0].geometry;
        try {
            const data = await polygonService.view(id);
            if (data.geojson.features[0] !== req.body.geojson.features[0]) {
                try {
                    const novo = await polygonService.update(id, name, geom);
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
        console.log('Polygons Controller: Delete');
        const {id} = req.body;
        try {
            data = polygonService.delete(id);
            return res.status(200).json({message: 'Polygon deleted'});
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
    // busca lugares(pontos) dentro de uma área(poligono)
    search: async (req, res) => {
        console.log('Polygons Controller: Search Points inside');
        const {id} = req.params;
        try {
            const data = await polygonService.search(id);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
};

module.exports = polygonController;
