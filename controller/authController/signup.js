const pool = require('../../model/database.js');
const { hashPassword } = require("./handlepassword.js");
const { handleGenerateID } = require('../generateID.js');
const { setToken } = require('../../service/auth.js')

async function handleSignUpUser(req, res) {
    const data = req.body;

    if (!data || !data.name || !data.email || !data.password) {
        return res.status(400).json({ msg: "All fields are required" });
    }


    try {

        const hashedPassword = await hashPassword(data.password);
        const id = await handleGenerateID();
        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await pool.query(`
    INSERT INTO User (id, name, email, password, created_at) 
    VALUES (?,?,?,?,?)`, [id, data.name, data.email, hashedPassword, currentTimestamp])

        const token = setToken(data.name, id)
        res.cookie("uid", token);

        const response = {
            "status": true,
            "content": {
                "data": {
                    "id": id,
                    "name": data.name,
                    "email": data.email,
                    "created_at": currentTimestamp
                },
                "meta": {
                    "access_token": token
                }
            }
        }
        return res.status(201).send(response)

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

module.exports = handleSignUpUser;