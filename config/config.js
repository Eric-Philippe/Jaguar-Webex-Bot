require("dotenv").config();

const WEBHOOKURL = process.env.WEBHOOKURL;
const TOKEN = process.env.BOTTOKEN;
const MAIN_GROUPID = process.env.MAIN_GROUPID;
const PORT = process.env.PORT;
var DEV = process.env.DEV;
var DEBUG = process.env.DEBUG;

if (!WEBHOOKURL || !TOKEN || !PORT || !MAIN_GROUPID) {
  console.error("Please provide all the required environment variables.");
  process.exit(1);
}

const booleans = ["true", "false"];

DEV = DEV == null ? false : !booleans.includes(DEV) ? false : DEV === "true";
DEBUG = DEBUG == null ? false : !booleans.includes(DEBUG) ? false : DEBUG === "true";

const FULL_CONFIG = {
  webhookUrl: WEBHOOKURL,
  token: TOKEN,
  mainGroupId: MAIN_GROUPID,
  port: PORT,
  dev: DEV,
  debug: DEBUG,
};

module.exports = {
  WEBHOOKURL,
  TOKEN,
  MAIN_GROUPID,
  PORT,
  DEV,
  DEBUG,
  FULL_CONFIG,
};
