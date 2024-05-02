var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
var express = require("express");
var bodyParser = require("body-parser");

const { DEV, DEBUG, FULL_CONFIG, PORT } = require("./config/config");
const Commands = require("./commands/Commands");
const Logger = require("./Logger");

const BotLogger = new Logger();

var app = express();

app.use(bodyParser.json());
app.use(express.static("images"));

// Change Jaguar to your bot's name
const MENTION_REGEX = /((webexteams:\/\/im?(.*)\s)|(Jaguar\s))(.*)/;

// init framework
var framework = new framework(FULL_CONFIG);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", () => {
  if (DEV) {
    console.log("framework is all fired up! [Press CTRL-C to quit]");
    console.log(`Bot loaded up ${Commands.length} commands !`);
  } else BotLogger.log("Framework initialized successfully !");
});

// framework.on("spawn", (bot, id, actorId) => {});

framework.on("log", (msg) => {
  if (DEBUG) console.log(msg);
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

  // All the commands are already sorted by priority
  // If the user enters a command that can be matched by multiple commands, the one with the highest priority will be executed
  const cmd = Commands.find((c) => {
    if (c.cmd && c.cmd.toLowerCase() === command.toLowerCase()) return c;
    if (c.alias && c.alias.toLowerCase() === command.toLowerCase()) return c;
    if (c.regex && c.regex.test(command)) return c;
  });

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
