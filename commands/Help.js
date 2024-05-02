const EmbedBuilder = require("../Embed");

/** @type {import("./Commands").Command} */
const help = {
  name: "help",
  emote: "❓",
  alias: "h",
  cmd: "help",
  description: "Affiche la liste des commandes disponibles.",
  priority: 999,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    const Commands = require("./Commands");

    const keyValuesCommands = Commands.map((cmd) => {
      return {
        key: `${cmd.emote} - ${cmd.name}`,
        value: cmd.description,
      };
    });

    const username = trigger.person.firstName + " " + trigger.person.lastName;

    const embed = new EmbedBuilder()
      .setTitle("📂 - Liste des commandes")
      .setAuthor("Jaguar Bot", username, bot.person.avatar)
      .setDescription("Voici la liste des commandes disponibles :")
      .addListElements(keyValuesCommands)
      .setFooter("Lancer une commande avec @Jaguar <commande>");

    bot.sendCard(embed.toJSON(), "adaptiveCard");
  },
};

module.exports = help;
