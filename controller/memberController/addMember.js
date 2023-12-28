const pool = require('../../model/database.js');
const { handleGenerateID } = require('../generateID.js');

async function handleAddMember(req, res) {

    try {
        const data = req.body;
        if (!data || !data.community || !data.role || !data.user) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const id = await handleGenerateID();
        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');


        await pool.query(`
    INSERT INTO Member (id, community,  user,role, created_at) 
    VALUES (?,?,?,?,?)`, [id, data.community, data.user, data.role, currentTimestamp])


        const response = {
            "status": true,
            "content": {
                "data": {
                    "id": id,
                    "community": data.community,
                    "user": data.user,
                    "role": data.role,
                    "created_at": currentTimestamp
                }
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

module.exports = handleAddMember;