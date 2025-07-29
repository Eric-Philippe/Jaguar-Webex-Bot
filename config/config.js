require("dotenv").config();

const WEBHOOKURL = process.env.WEBHOOKURL;
const TOKEN = process.env.BOTTOKEN;
const MAIN_GROUPID = process.env.MAIN_GROUPID;
const PORT = process.env.PORT;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || "jaguar"; // Default database name
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";

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
  db: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  dev: DEV,
  debug: DEBUG,
};

module.exports = {
  WEBHOOKURL,
  TOKEN,
  MAIN_GROUPID,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DEV,
  DEBUG,
  FULL_CONFIG,
};
