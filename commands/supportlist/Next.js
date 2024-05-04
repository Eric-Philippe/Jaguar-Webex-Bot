const Utils = require("../../utils/Utils");
const UserServices = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const next = {
  name: "next",
  group: commandGroup,
  emote: "⏭️",
  cmd: "next",
  alias: "n",
  description: "Affecte l'utilisateur suivant à la boîte commune",
  usage: `<@Jaguar ${commandGroup.cmdName} next>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} next> - Affecte l'utilisateur suivant à la boîte commune.`,
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const { previous, current, next } = await Utils.getMemberOrderedList();
    if (!next) return Messages.sendError(bot, "Il n'y a pas d'utilisateur suivant à affecter à la boîte commune !");

    await UserServices.setPointed(current.id, false);
    await UserServices.setPointed(next.id, true);

    //bot.say("markdown", `✅ | **${next.firstName} ${next.lastName}** a bien été affecté à la boîte commune !`);
    Messages.sendSuccess(bot, `**${next.firstName} ${next.lastName}** a bien été affecté à la boîte commune !`);
  },
};

module.exports = next;
