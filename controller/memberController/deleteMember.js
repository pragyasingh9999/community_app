const pool = require('../../model/database.js');

async function handleDeleteMember(req, res) {
    const member_id = req.params.id;

    const [rows] = await pool.query(`
         SELECT community
         FROM Member 
         WHERE member_id=?
    `, [member_id]);
}

module.exports = handleDeleteMember;