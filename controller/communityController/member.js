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
        SELECT
        Member.id,
        Member.community,
        JSON_OBJECT('id', User.id, 'name', User.name) AS user,
        JSON_OBJECT('id', Role.id, 'name', Role.name) AS role,
        Member.created_at
        FROM
        Member
        JOIN
        User ON Member.user = User.id
        JOIN
        Role ON Member.role = Role.id;
    `, [community_id]);

        const response = {
            "status": true,
            "content": {
                "meta": {
                    "total": result.length,
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