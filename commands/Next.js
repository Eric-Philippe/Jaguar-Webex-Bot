const Utils = require("../utils/Utils");
const UserServices = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const next = {
  name: "next",
  emote: "📦",
  cmd: "next",
  alias: "n",
  description: "Affecte l'utilisateur suivant à la boîte commune",
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const { previous, current, next } = await Utils.getMemberOrderedList();
    if (!next) return bot.say("❌ | Il n'y a pas d'utilisateur suivant !");

    await UserServices.setPointed(current.id, false);
    await UserServices.setPointed(next.id, true);

    bot.say("markdown", `✅ | **${next.firstName} ${next.lastName}** a bien été affecté à la boîte commune !`);
  },
};

module.exports = next;
