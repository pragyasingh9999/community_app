const pool = require('../../model/database.js');
const { getUser } = require("../../service/auth.js");

async function handleReturnUserInfo(req, res) {
    const token = req.cookies.uid;
    if (!token) return res.send("Token not provided, you need to loggin first");

    const user = getUser(token);

    const id = user.id;

    try {
        const [result] = await pool.query(`
            SELECT id, name, email, created_at
            FROM User
            WHERE id=?
        `, [id]);

        const response = {
            "status": true,
            "content": {
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

module.exports = handleReturnUserInfo;



