const Bot = require("webex-node-bot-framework/lib/bot");
const EmbedBuilder = require("../../utils/Embed");
const { GroupCommands } = require("../GroupCommands/GroupCommand");

/** @type {import("../Commands").Command} */
const help = {
  name: "help",
  emote: "❓",
  alias: "h",
  cmd: "help",
  description: "Affiche la liste des commandes disponibles.",
  usage: `<@Jaguar help> | <@Jaguar help [Commande]>\n\n**Exemple :**\n- @Jaguar help -> Affiche la liste des commandes disponibles.\n- @Jaguar help ping -> Affiche l'aide pour la commande ping.`,
  priority: 999,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger, args) => {
    if (args.length <= 1) return generalHelp(bot, trigger);

    const Commands = require("../Commands");
    const command = Commands.find((cmd) => cmd.name === args[1]);
    if (!command) return generalHelp(bot, trigger);

    commandHelp(bot, trigger, command);
  },
};

const generalHelp = (bot, trigger) => {
  const Commands = require("../Commands");

  const username = trigger.person.firstName + " " + trigger.person.lastName;

  const embedExplanation = new EmbedBuilder()
    .setTitle("🔖 - Comment ça marche ?")
    .addDescription("Pour lancer une commande, il suffit de mentionner Jaguar Bot suivi de la commande souhaitée.")
    .addDescription("Exemple: `@Jaguar ping`")
    .addDescription(
      "Pour plus d'informations sur une commande, vous pouvez utiliser la commande `@Jaguar help <commande>`."
    )

    .setFooter("Si vous avez des questions, n'hésitez pas à contacter Éric PHILIPPE !");

  bot.sendCard(embedExplanation, "adaptiveCard");

  const embed = new EmbedBuilder()
    .setTitle("📂 - Liste des commandes")
    .setAuthor("Jaguar Bot", username, bot.person.avatar)
    .setFooter("Lancer une commande avec @Jaguar <commande>");

  // Copy the array to avoid modifying the original
  let groupCommands = [...GroupCommands];
  groupCommands.unshift(null);

  groupCommands.forEach((group) => {
    if (group) embed.setSubtitle(`**${group.emote} ${group.title}**`);
    else embed.setSubtitle(`**📘 Commandes générales**`);

    const commands = group ? Commands.filter((cmd) => cmd.group === group) : Commands.filter((cmd) => !cmd.group);
    const keyValues = commands.map((cmd) => {
      return {
        key: `${cmd.emote} ${cmd.name}`,
        value: cmd.description,
      };
    });
    embed.addListElements(keyValues);

    // If element is not the last one, add a line break
    if (groupCommands.indexOf(group) < groupCommands.length - 1) embed.addDescription("\n");
  });

  bot.sendCard(embed, "adaptiveCard");
};

/**
 *
 * @param {Bot} bot
 * @param {Trigger} trigger
 * @param {import("../Commands").Command} command
 */
const commandHelp = (bot, trigger, command) => {
  const username = trigger.person.firstName + " " + trigger.person.lastName;

  const embed = new EmbedBuilder()
    .setTitle(`📚 - ${command.name}`)
    .setAuthor("Jaguar Bot", username, bot.person.avatar)
    .addDescription(command.description)
    .addDescription(`**Usage:** \n${command.usage}`);

  bot.sendCard(embed, "adaptiveCard");
};

module.exports = help;
