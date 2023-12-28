const pool= require('../../model/database.js');

async function handleReturnRole(req,res){

    const [rows]= await pool.query(`
        SELECT *
        FROM Role;
    `)

    return res.send(rows);
}

module.exports= handleReturnRole;