const {getUser}= require("../service/auth");

async function restrictToLoggedInUserOnly(req,res,next){
   const userUid= req.cookies.uid;

   if(!userUid) return res.send("Token not provided, you need to loggin first");

   const user= getUser(userUid);
   if(!user) return res.send("Invalid Token");

   req.user= user;
   next();
}

module.exports={restrictToLoggedInUserOnly}