const searchService = require('../service/searchService');


const searchController = {

    findEntities: async (req, res) => {
        console.log('Search Controller: List');
        const {lat, lon, radius} = req.body;
        try {
            const data = await searchService.checkCircle(lat, lon, radius);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Controller Error: failed access to database',
                err: err,
            });
        }
    },
};


module.exports = searchController;
