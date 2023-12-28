const pool = require('../../model/database.js');

async function handleReturnRole(req, res) {


    try {
        const [rows] = await pool.query(`
        SELECT *
        FROM Role;
    `)

        const response = {
            "status": true,
            "content": {
                "meta": {
                    "total": rows.length
                },
                "data": rows
            }
        }
        return res.status(200).send(response);

    } catch (e) {
        const response = {
            "status": false,
            "content": {
                "data": {}
            }
        }
        return res.status(200).send(response);
    }


}

module.exports = handleReturnRole;