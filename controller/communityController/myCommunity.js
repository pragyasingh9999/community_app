const pool = require('../../model/database.js');


async function handleGetMyOwnedCommunity(req, res) {
    const user_id = req.user.id;

    try {
        const [rows] = await pool.query(`
         SELECT *
         FROM Community
         WHERE owner=?
    `, [user_id]);

        const response = {
            "status": true,
            "content": {
                "meta": {
                    "total": rows.length,
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

async function handleGetMyJoinedCommunity(req, res) {
    const user_id = req.user.id;

    try {
        const [rows] = await pool.query(`
    SELECT  
    Community.id,
    Community.name,
    Community.slug,
    JSON_OBJECT('id', User.id, 'name', User.name) AS owner,
    Community.created_at,
    Community.updated_at
    FROM Community
    JOIN
    User ON Community.owner = User.id
    JOIN Member ON Community.id = Member.community
    WHERE Member.user = ?
    `, [user_id]);

        const response = {
            "status": true,
            "content": {
                "meta": {
                    "total": rows.length,
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

module.exports = {
    handleGetMyOwnedCommunity,
    handleGetMyJoinedCommunity
}