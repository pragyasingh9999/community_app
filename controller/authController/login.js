const pool= require('../../model/database.js');
const {checkPassword}= require("./handlepassword.js");
const {setToken}= require('/home/pragya/Desktop/community_app/service/auth.js')


async function handleUserLogin(req,res){
    const data= req.body; 
    if(!data || !data.email || !data.password){
        return res.status(400).json({msg: "All fields are required"});
    }

    const email= data.email;
    const login_password= data.password;

    const [user]= await pool.query(`
    SELECT password 
    FROM User 
    WHERE email= ?`,[email]);

    if(!user){
        return res.send("User does not exist");
    }

    if(user.length>0){

        const hashed_password= user[0].password;
        const result= await checkPassword(login_password,hashed_password);

        if(result){
            const token=  setToken(user[0].name, user[0].email)
            res.cookie("uid", token);
            res.send(`Successfully Logged In`);
        }else{
            res.send('Password does not match.')
        }
    }

}

module.exports= handleUserLogin;