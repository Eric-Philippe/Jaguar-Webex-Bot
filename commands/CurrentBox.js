const EmbedBuilder = require("../Embed");
const { getPointedUser } = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const getCurrentBox = {
  name: "today",
  emote: "📦",
  cmd: "today",
  description: "Affiche l'utilisateur de la boite commune.",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: async (bot, trigger) => {
    const user = await getPointedUser();
    if (user ?? true) return bot.say("❌ | Aucun utilisateur n'est assigné à la liste de la boite commune !");

    const keyValue = {
      key: `👤 - ${user.firstName} ${user.lastName}`,
      value: user.personId ? "🔵" : "",
    };

    const embed = new EmbedBuilder().setTitle("📦 - Utilisateur de la boite commune").addListElements(keyValue);

    bot.sendCard(embed, "Utilisateur de la boite commune");
  },
};

module.exports = getCurrentBox;
