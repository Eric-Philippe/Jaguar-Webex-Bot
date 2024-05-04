const EmbedBuilder = require("../../utils/Embed");
const { getUsers } = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const list = {
  name: "list",
  group: commandGroup,
  emote: "📋",
  cmd: "list",
  alias: "l",
  description: "Affiche la liste des utilisateurs de la boite commune",
  usage: `<@Jaguar ${commandGroup.cmdName} list>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} list> - Affiche la liste des utilisateurs de la boite commune`,
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const users = await getUsers();
    if (users.length === 0) return Messages.sendInfo(bot, "Il n'y a pas d'utilisateurs dans la boite commune !");
    const keyValues = users.map((user) => {
      return {
        key: `👤 - ${user.firstName} ${user.lastName.toUpperCase()}`,
        value: user.pointed ? "🔵" : "",
      };
    });

    const embed = new EmbedBuilder()
      .setTitle("📦 | Liste des utilisateurs de la boite commune :")
      .addListElements(keyValues);

    bot.sendCard(embed, "Liste des utilisateurs de la boite commune");
  },
};

module.exports = list;
