var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");

const { DEV, DEBUG, FULL_CONFIG, PORT } = require("./config/config");
const { closeDB } = require("./Database");
const LoggerInstance = require("./Logger");
const onMessage = require("./events/onMessage");
const onDbReady = require("./events/onDbReady");

var app = express();

app.use(bodyParser.json());
app.use(express.static("images"));

// init framework
var framework = new framework(FULL_CONFIG);
framework.start();
console.log(`%c 🤖 Starting framework, please wait...`, "color: #eb4034");

framework.on("initialized", () => {
  onDbReady();

  if (DEV)
    console.log(
      `%c 🤖 framework is all fired up! [Press CTRL-C to quit]`,
      "color: #eb4034"
    );
  else LoggerInstance.log("Framework initialized successfully !");

  onMessage(framework);
});

// framework.on("spawn", (bot, id, actorId) => {});

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
