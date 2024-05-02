require("dotenv").config();

const WEBHOOKURL = process.env.WEBHOOKURL;
const TOKEN = process.env.BOTTOKEN;
const PORT = process.env.PORT;
var DEV = process.env.DEV;
var DEBUG = process.env.DEBUG;

if (!WEBHOOKURL || !TOKEN || !PORT) {
  console.error("Please provide all the required environment variables.");
  process.exit(1);
}

const booleans = ["true", "false"];
// if dev is null then set it to false
// If dev is not "true" or "false" then set it to false
// Otherwise convert it to a boolean
DEV = DEV == null ? false : !booleans.includes(DEV) ? false : DEV === "true";
DEBUG =
  DEBUG == null ? false : !booleans.includes(DEBUG) ? false : DEBUG === "true";

const FULL_CONFIG = {
  webhookUrl: WEBHOOKURL,
  token: TOKEN,
  port: PORT,
  dev: DEV,
  debug: DEBUG,
};

module.exports = {
  WEBHOOKURL,
  TOKEN,
  PORT,
  DEV,
  DEBUG,
  FULL_CONFIG,
};
