const { createTable } = require("../Database");
const { DEV } = require("../config/config");

/**
 * Function to run when the database is ready
 */
const onDbReady = async function () {
  await createTable();
  if (DEV) console.log("Database is ready.");
};

module.exports = onDbReady;
