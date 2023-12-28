const pool = require('../../model/database.js');
const { checkPassword } = require("./handlepassword.js");
const { setToken } = require('../../service/auth.js')


async function handleUserLogin(req, res) {
    const data = req.body;
    if (!data || !data.email || !data.password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {

        const email = data.email;

        const [user] = await pool.query(`
    SELECT *
    FROM User 
    WHERE email= ?`, [email]);


        const hashed_password = user[0].password;
        const login_password = data.password;
        const result = await checkPassword(login_password, hashed_password);


        if (result) {
            const token = setToken(user[0].name, user[0].id)
            res.cookie("uid", token);

            const response = {
                "status": true,
                "content": {
                    "data": {
                        "id": user[0].id,
                        "name": user[0].name,
                        "email": user[0].email,
                        "created_at": user[0].created_at
                    },
                    "meta": {
                        "access_token": token
                    }
                }
            }
            return res.status(200).send(response);
        } else {
            res.send('Password does not match.')
        }

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

module.exports = handleUserLogin;