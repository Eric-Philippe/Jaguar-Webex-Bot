const Commands = require("../commands/Commands");
const { GroupCommands } = require("../commands/GroupCommands/GroupCommand");
const Messages = require("../utils/Messages");

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

    // We remove the first element of the array which is the full match
    const args = trigger.args.slice(1);

    // Declare the supposed command passed by the user
    const commandGroup = args[0];
    let availableCommands = Commands.filter((cmd) => !cmd.group);
    let command = args[0];

    // If we can find the command group
    const group = GroupCommands.find(
      (g) =>
        g.cmdName.toLowerCase() === commandGroup.toLowerCase() || g.alias.toLowerCase() === commandGroup.toLowerCase()
    );
    if (group) {
      // We setup the available commands to the commands of the group
      command = args[1];
      availableCommands = Commands.filter((cmd) => cmd.group && cmd.group.title === group.title);
    }

    // All the commands are already sorted by priority
    // If the user enters a command that can be matched by multiple commands, the one with the highest priority will be executed
    const cmd = availableCommands.find((c) => {
      if (c.cmd && c.cmd.toLowerCase() === command.toLowerCase()) return c;
      if (c.alias && c.alias.toLowerCase() === command.toLowerCase()) return c;
      if (c.regex && c.regex.test(command)) return c;
    });

    if (!cmd) {
      return Messages.sendInfo(
        bot,
        `La commande ${command} n'existe pas.\nConsultez la liste des commandes avec @Jaguar help`
      );
    }

    try {
      const args = group ? trigger.text.split(" ").slice(2) : trigger.text.split(" ").slice(1);
      cmd.handler(bot, trigger, args);
    } catch (err) {
      console.error(err);
      bot.say("Une erreur est survenue lors de l'exécution de la commande.");
    }
  });
};

module.exports = onMessage;
