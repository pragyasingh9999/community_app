const pool = require('../../model/database.js');

async function handleDeleteMember(req, res) {
    const member_id = req.params.id;
    const user_id = req.user.id;

    try {

        const [rows] = await pool.query(`
         SELECT community
         FROM Member
         WHERE id=?
    `, [member_id]);

        const community_id = rows[0].community;

        const [result] = await pool.query(`
        SELECT owner
        FROM Community
        WHERE id=?
    `, [community_id]);

        const owner_id = result[0].owner;

        if (owner_id === user_id) {

        await pool.query(`
        DELETE FROM
        Member
        WHERE id=?
        `, [member_id])

            console.log("yes");

            const response = {
                "status": true,
            }

            return res.status(200).send(response);
        }

        return res.send("NOT_ALLOWED_ACCESS");

    } catch (e) {
        const response = {
            "status": false,
        }
        return res.status(200).send(response);
    }


}

module.exports = handleDeleteMember;