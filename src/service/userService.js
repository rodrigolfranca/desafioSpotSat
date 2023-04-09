const pool = require('../database/connection');

const userService = {
    getUserByEmail: async (email) => {
        console.log('Service: Login');
        const query = `
        SELECT *
        FROM users
        WHERE email = $1;`;
        const values = [email];
        try {
            const data = await pool.query(query, values);
            return data.rows[0];
        } catch (err) {
            throw err;
        }
    },
};

module.exports = userService;
