const cardJSON = {
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  type: "AdaptiveCard",
  version: "1.0",
  body: [
    {
      type: "ColumnSet",
      columns: [
        {
          type: "Column",
          width: "5",
          items: [],
        },
      ],
    },
  ],
};

/** @type {import("./Commands").Command} */
const help = {
  name: "help",
  alias: "h",
  cmd: "help",
  description: "**Help**: Affiche la liste des commandes disponibles.",
  priority: 999,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    const Commands = require("./Commands");
    for (let i = 0; i < Commands.length; i++) {
      let command = Commands[i];
      if (command.cmd) {
        cardJSON.body[0].columns[0].items.push({
          type: "TextBlock",
          text: `[${i + 1}] : ${command.description} : \`${command.cmd}\``,
          size: "medium",
          horizontalAlignment: "Left",
          wrap: true,
        });
      }
    }

    bot.say("markdown", "## Commandes disponibles :");
    bot.sendCard(
      cardJSON,
      "Une erreur est survenue lors de l'affichage des commandes. Merci de réessayer plus tard."
    );
    bot.say(
      "markdown",
      "> Pour exécuter une commande, mentionnez le bot suivi de la commande."
    );
  },
};

module.exports = help;
