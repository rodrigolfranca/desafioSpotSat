const pool = require('../database/connection');

searchService = {

    checkCircle: async (lat, lon, radius) => {
        console.log('Service: Checando Círculo');
        const query = `
        SELECT id, name, ST_AsGeoJSON(geom)::json as geom
        FROM points
        WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3)

        UNION ALL

        SELECT id, name, ST_AsGeoJSON(geom)::json as geom
        FROM polygons
        WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3);`;
        const values = [lat, lon, radius];
        try {
            const data = await pool.query(query, values);
            return data.rows;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = searchService;
