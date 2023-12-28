const pool = require('../../model/database.js');

async function handleGetAllMembers(req, res) {
    const community_name = req.params.id;

    try {

        const [rows] = await pool.query(`
         SELECT id
         FROM Community
         WHERE name=?
    `, [community_name]);


        const community_id = rows[0].id;

        const [result] = await pool.query(`
        SELECT *
        FROM Member
        WHERE community=?
    `, [community_id]);

        const response = {
            "status": true,
            "content": {
                "meta": {
                    "total": result.length,
                    "pages": 1,
                    "page": 1
                },
                "data": result
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

module.exports = handleGetAllMembers;