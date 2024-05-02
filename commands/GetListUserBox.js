const EmbedBuilder = require("../Embed");
const { getUsers } = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const getListUserBox = {
  name: "list",
  emote: "📦",
  cmd: "list",
  description: "Affiche la liste des utilisateurs de la boite commune",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: async (bot, trigger) => {
    const users = await getUsers();
    if (users.length === 0) return bot.say("❌ | Aucun utilisateur dans la liste de la boite commune !");

    const keyValues = users.map((user) => {
      return {
        key: `👤 - ${user.firstName} ${user.lastName}`,
        value: user.personId ? "🔵" : "",
      };
    });

    const embed = new EmbedBuilder()
      .setTitle("📦 | Liste des utilisateurs de la boite commune :")
      .addListElements(keyValues);

    bot.sendCard(embed, "Liste des utilisateurs de la boite commune");
  },
};

module.exports = getListUserBox;
