const pool = require('../../model/database.js');
const { handleGenerateID } = require('../generateID.js');
const Joi = require('joi');

async function handleCreateRole(req, res) {
  const data = req.body;
  if (!data || !data.name) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  try {

    const name = data.name;
    const id = await handleGenerateID();
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const validationResult = userSchema.validate({"name": name});
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    await pool.query(`
           INSERT INTO Role (id, name,created_at, updated_at) 
           VALUES (?,?,?,?)`, [id, data.name, currentTimestamp, currentTimestamp]
    )

    const response = {
      "status": true,
      "content": {
        "data": {
          "id": id,
          "name": data.name,
          "created_at": currentTimestamp,
          "update_at": currentTimestamp
        }
      }
    }
    return res.status(201).send(response);

  }
  catch (e) {
    const response = {
      "status": false,
      "content": {
        "data": {}
      }
    }
    return res.status(200).send(response);
  }


}

module.exports = handleCreateRole;