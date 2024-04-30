require("dotenv").config();

var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(express.static("images"));

const config = {
  webhookUrl: process.env.WEBHOOKURL,
  token: process.env.BOTTOKEN,
  port: process.env.PORT,
  dev: process.env.DEV,
  debug: process.env.DEBUG,
};

const Commands = require("./commands/Commands");

const MENTION_REGEX = /(webexteams:\/\/im?(.*)\s)(.*)/;

// init framework
var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", () => {
  console.log("framework is all fired up! [Press CTRL-C to quit]");
  console.log(`Bot loaded up ${Commands.length} commands !`);
});

// framework.on("spawn", (bot, id, actorId) => {});

framework.on("log", (msg) => {
  if (config.debug == null || config.debug == "true") console.log(msg);
});

// Process incoming messages
// Each hears() call includes the phrase to match, and the function to call if webex mesages
// to the bot match that phrase.
// An optional 3rd parameter can be a help string used by the frameworks.showHelp message.
// An optional fourth (or 3rd param if no help message is supplied) is an integer that
// specifies priority.   If multiple handlers match they will all be called unless the priority
// was specified, in which case, only the handler(s) with the lowest priority will be called

/* On mention with command
ex User enters @botname ping, the bot will write back in markdown
*/
framework.hears(MENTION_REGEX, (bot, trigger) => {
  if (trigger.args.length <= 1) return;
  const command = trigger.args.slice(1).join(" ");

  const cmd = Commands.find((c) => c.cmd === command || c.alias === command);

  if (!cmd) {
    bot.say("Je ne comprends pas cette commande.");
    return;
  }

  try {
    cmd.handler(bot, trigger);
  } catch (err) {
    console.error(err);
    bot.say("Une erreur est survenue lors de l'exécution de la commande.");
  }
});

//Server config & housekeeping
// Health Check
app.get("/", (req, res) => {
  res.send(`I'm alive.`);
});

app.post("/", webhook(framework));

var server = app.listen(config.port, () => {
  framework.debug("framework listening on port %s", config.port);
});

// gracefully shutdown (ctrl-c)
process.on("SIGINT", () => {
  framework.debug("stopping...");
  server.close();
  framework.stop().then(() => {
    process.exit();
  });
});
