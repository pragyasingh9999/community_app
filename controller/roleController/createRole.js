const pool= require('../../model/database.js');
const {handleGenerateID}= require('../generateID.js');

async function handleCreateRole(req,res){
      const data= req.body;
      if(!data || !data.name){
        return res.status(400).json({msg: "All fields are required"});
      }

      const name= data.name;

      const [rows]= await pool.query(`
      SELECT *
      FROM Role
      WHERE name= ?`,[name]);

      if(rows.length>0){
        return res.send("Role alredy exists");
      }
   
      const id= await handleGenerateID();
      const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const result= await pool.query(`
           INSERT INTO Role (id, name,created_at, updated_at) 
           VALUES (?,?,?,?)`,[id, data.name, currentTimestamp, currentTimestamp]   
       )

      return res.status(201).send("Role stored successfully");

       
}

module.exports= handleCreateRole;