const pool = require('../../model/database.js');
const { handleGenerateID } = require('../generateID.js');


async function findRoleId(role) {

  const [find] = await pool.query(`
       SELECT id
       FROM Role
       WHERE name= ?`, [role]);

  if (find.length == 0) {
    const id2 = await handleGenerateID();
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await pool.query(`
           INSERT INTO Role (id, name,created_at, updated_at) 
           VALUES (?,?,?,?)`, [id2, role, currentTimestamp, currentTimestamp]
    )

    return id2;
  }

  return find[0].id;
}


async function handleCreateCommunity(req, res) {
  const data = req.body;

  if (!data || !data.name) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {

    const name = data.name;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const cleanSlug = slug.replace(/[^a-z0-9-]/g, '');


    const id = await handleGenerateID();
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(`
      INSERT INTO Community (id, name, slug, owner,  created_at, updated_at) 
      VALUES (?,?,?,?,?,?)`, [id, data.name, cleanSlug, req.user.id, currentTimestamp, currentTimestamp]
    )

    const role = "Community Admin";

    const user_id = req.user.id;
    const community_id = id;
    const role_id = await findRoleId(role);

    const member_id = await handleGenerateID();


    const ans = await pool.query(`
       INSERT INTO Member (id, community, user, role,  created_at) 
       VALUES (?,?,?,?,?)`, [member_id, community_id, user_id, role_id, currentTimestamp]
    )


    const response = {
      "status": true,
      "content": {
        "data": {
          "id": id,
          "name": data.name,
          "slug": cleanSlug,
          "owner": req.user.id,
          "created_at": currentTimestamp,
          "updated_at": currentTimestamp
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

async function handleGetAllCommunity(req, res) {

  try {

    const [rows] = await pool.query(`
    SELECT *
    FROM Community;
   `)

    const response = {
      "status": true,
      "content": {
        "meta": {
          "total": rows.length,
          "pages": 1,
          "page": 1
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
  handleCreateCommunity,
  handleGetAllCommunity
}