/** @DEPENDENCIES */
var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");

/** @CLASSES_AND_METHODS */
const { DEV, DEBUG, FULL_CONFIG, PORT } = require("./config/config");
const { closeDB } = require("./Database");
const LoggerInstance = require("./utils/Logger");
const onDbReady = require("./events/onDbReady");
const subscribeEvents = require("./events/Events");
const CronScripts = require("./utils/CronScript");
const { createCronScripts } = require("./scripts/Scripts");

var app = express();

app.use(bodyParser.json());
app.use(express.static("images"));

// init framework
var framework = new framework(FULL_CONFIG);
framework.start();
CronScripts.setFramework(framework);

console.log(`%c 🤖 Starting framework, please wait...`, "color: #f8c427");
console.log(
  `%c 🤖 Framework Configuration : 💻 DEV: ${DEV}, 📺 DEBUG: ${DEBUG}, 📡 Listening on port: ${PORT}`,
  "color: #f8c427"
);

framework.on("initialized", async () => {
  await onDbReady();

  console.info(`%c 🤖 Framework connected on ${framework.person.displayName}`, "color: #00ff00");

  if (DEV) console.log(`%c 🤖 framework is all fired up! [Press CTRL-C to quit]`, "color: #00ff00");
  else LoggerInstance.log("Framework initialized successfully !");

  subscribeEvents(framework);
  createCronScripts(framework);
});

framework.on("log", (msg) => {
  if (DEBUG) console.log(msg);
});

//Server config & housekeeping
// Health Check
app.get("/", (req, res) => {
  res.send(`I'm alive.`);
});

app.post("/", webhook(framework));

var server = app.listen(PORT, () => {
  framework.debug("framework listening on port %s", PORT);
});

// gracefully shutdown (ctrl-c)
process.on("SIGINT", () => {
  framework.debug("stopping...");
  server.close();
  framework.stop().then(() => {
    closeDB();
    process.exit();
  });
});
