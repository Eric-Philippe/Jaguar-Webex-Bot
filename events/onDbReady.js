const { createTable } = require("../Database");
const { DEV } = require("../config/config");

/**
 * Function to run when the database is ready
 */
const onDbReady = async function () {
  await createTable();
  if (DEV) console.log(`%c 💾 Database is connected and ready to use.`, "color: #00ff00");
};

module.exports = onDbReady;
