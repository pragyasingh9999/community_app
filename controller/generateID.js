const snowflake = require("@theinternetfolks/snowflake");

async function handleGenerateID(){
   const id= snowflake.Snowflake.generate();
   console.log(id);
   return id;
}

module.exports = {handleGenerateID};
