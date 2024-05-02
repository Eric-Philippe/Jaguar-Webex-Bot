const { createTable } = require("../Database");
const { DEV } = require("../config/config");

const onDbReady = async function () {
  await createTable();
  if (DEV) console.log("Database is ready.");
};

module.exports = onDbReady;
