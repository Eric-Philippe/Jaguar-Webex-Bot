const Utils = require("../utils/Utils");
const UserServices = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const previous = {
  name: "previous",
  emote: "📦",
  cmd: "previous",
  alias: "p",
  description: "Affecte l'utilisateur précédent à la boîte commune",
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const { previous, current, next } = await Utils.getMemberOrderedList();
    if (!previous) return bot.say("❌ | Il n'y a pas d'utilisateur précédent !");

    await UserServices.setPointed(current.id, false);
    await UserServices.setPointed(next.id, true);

    bot.say("markdown", `✅ | **${previous.firstName} ${previous.lastName}** a bien été affecté à la boîte commune !`);
  },
};

module.exports = previous;
