const pool = require('../database/connection');

const pointService = {

    list: async () => {
        console.log('Service: Selecting All');
        const query = `
        SELECT
        json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', json_build_object(
                        'id', id,
                        'name', name                        
                    )
                )
            )
        ) AS geojson
        FROM points`;
        try {
            const data = await pool.query(query);
            return data.rows;
        } catch (err) {
            throw err;
        }
    },
    view: async (id) => {
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
        ) as geojson FROM points WHERE id=$1;`;
        const values = [id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    create: async (name, geom) => {
        console.log('Service: Posting One');
        const query = `
        INSERT INTO points (name, geom)
        VALUES ($1, ST_GeomFromGeoJSON($2))
        RETURNING id;`;
        const values = [name, geom];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    update: async (id, name, geom) => {
        console.log('Service: Updating One');
        const query = `
        UPDATE points
        SET name = $1, geom = ST_GeomFromGeoJSON($2)
        WHERE id = $3
        RETURNING id;`;
        const values = [name, geom, id];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    delete: async (id) => {
        console.log('Service: Deleting One');
        const query = `
        DELETE FROM points
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
    getDistance: async (id1, id2) => {
        console.log('Service: selecting distance');
        const query = `
        SELECT ST_DISTANCE(
            ST_Transform(p1.geom, 2163),
            ST_Transform(p2.geom, 2163))
        AS distance_in_meters
        FROM points p1, points p2
        WHERE p1.id = $1 AND p2.id = $2;`;
        const values = [id1, id2];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
    isIn: async (idPoint, idPolygon)=>{
        console.log('Service: point in polygon');
        const query = `
        SELECT ST_Contains(polygon.geom, point.geom)
        AS esta_no_lugar
        FROM points point, polygons polygon
        WHERE point.id=$1 AND polygon.id=$2;`;
        const values = [idPoint, idPolygon];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },

};

module.exports = pointService;
