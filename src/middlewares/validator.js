const geojsonhint = require('@mapbox/geojsonhint');

const validateGeojson = (req, res, next) => {
    console.log('Middleware: Validating GeoJSON');
    const {geojson} = req.body;
    const result = geojsonhint.hint(geojson, {
        ignoreRightHandRule: true,
        precisionWarning: false,
    });

    if (result.length>0) {
        return res.status(400).json({message: 'Invalid GeoJSON', result});
    } else {
        next();
    }
};

module.exports = validateGeojson;
