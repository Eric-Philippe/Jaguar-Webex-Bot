var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");

const { DEV, DEBUG, FULL_CONFIG, PORT } = require("./config/config");
const Logger = require("./Logger");
const onMessage = require("./events/onMessage");

const BotLogger = new Logger();

var app = express();

app.use(bodyParser.json());
app.use(express.static("images"));

// init framework
var framework = new framework(FULL_CONFIG);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", () => {
  if (DEV) console.log("framework is all fired up! [Press CTRL-C to quit]");
  else BotLogger.log("Framework initialized successfully !");

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
    process.exit();
  });
});
