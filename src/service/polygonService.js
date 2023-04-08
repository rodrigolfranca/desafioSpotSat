const pool = require('../database/connection');

polygonService = {

    selectAll: async () => {
        console.log('Service: Selecting All');
        const query = `
        SELECT id, name, ST_AsGeoJSON(geom)::json as geom
        FROM polygons;`;
        try {
            const data = await pool.query(query);
            return data.rows;
        } catch (err) {
            throw err;
        }
    },
    selectOne: async (id) => {
        console.log('Service: Selecting one');
        const query = `
        SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', json_build_object('name', name)
                )
            )
        ) as geojson FROM polygons WHERE id=$1;`;
        const values = [id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    insertOne: async (name, geom) => {
        console.log('Service: Posting One');
        const query = `
        INSERT INTO polygons (name, geom)
        VALUES ($1, ST_GeomFromGeoJSON($2));`;
        const values = [name, geom];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    updateOne: async (id, name, geom) => {
        console.log('Service: Updating One');
        const query = `
        UPDATE polygons
        SET name = $1, geom = ST_GeomFromGeoJSON($2)
        WHERE id = $3
        RETURNING *;`;
        const values = [name, geom, id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    deleteOne: async (id) => {
        console.log('Service: Deleting One');
        const query = `
        DELETE FROM polygons
        WHERE id = $1
        RETURNING *;`;
        const values = [id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
};


module.exports = polygonService;

