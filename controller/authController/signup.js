const pool= require('../../model/database.js');
const {hashPassword}= require("./handlepassword.js");
const {handleGenerateID}= require('../generateID.js');


async function handleSignUpUser(req,res){
    const data= req.body;

    if(!data || !data.name || !data.email || !data.password){
        return res.status(400).json({msg: "All fields are required"});
    }

    const email= data.email;

    const [rows]= await pool.query(`
     SELECT *
     FROM User  
     WHERE email= ?`,[email]);


     if(rows.length>0 ){
        return res.send("User alredy exists");
     }

     const hashedPassword= await hashPassword(data.password);
     const id= await handleGenerateID();
     const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const result= await pool.query(`
    INSERT INTO User (id, name, email, password, created_at) 
    VALUES (?,?,?,?,?)`,[id, data.name, data.email, hashedPassword, currentTimestamp])
    
    return res.status(201).send("Data stored successfully");


}

module.exports= handleSignUpUser;