const Commands = require("../commands/Commands");

// Change Jaguar to your bot's name
const MENTION_REGEX = /((webexteams:\/\/im?(.*)\s)|(Jaguar\s))(.*)/;

// Process incoming messages
// Each hears() call includes the phrase to match, and the function to call if webex mesages
// to the bot match that phrase.
// An optional 3rd parameter can be a help string used by the frameworks.showHelp message.
// An optional fourth (or 3rd param if no help message is supplied) is an integer that
// specifies priority.   If multiple handlers match they will all be called unless the priority
// was specified, in which case, only the handler(s) with the lowest priority will be called

const onMessage = function (framework) {
  /* On mention with command
   * ex User enters @botname ping, the bot will write back in markdown
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
};

module.exports = onMessage;
