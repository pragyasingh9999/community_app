const jwt= require('jsonwebtoken');

const sercet= process.env.MY_SERCETKEY;


function setToken(name,email){
    const payload={
        name,
        email
    }

    return jwt.sign(payload, sercet);
}

function getUser(token){
    if(!token) return null;
    try{
    return jwt.verify(token, sercet);
    }catch(error){
        return null;
    }
}


module.exports={setToken, getUser};