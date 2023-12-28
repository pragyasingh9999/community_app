const bcrypt = require('bcrypt');

async function hashPassword(password){
    const saltRounds = 12; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return hashedPassword;
}

async function checkPassword(login_password,hashed_password){

    const isMatch = await bcrypt.compare(login_password.toString(), hashed_password);
    return isMatch;
}

module.exports= {hashPassword,checkPassword};