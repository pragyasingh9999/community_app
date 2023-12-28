const snowflake = require("@theinternetfolks/snowflake");

async function handleGenerateID() {
   const id = snowflake.Snowflake.generate();
   return id;
}

module.exports = { handleGenerateID };
