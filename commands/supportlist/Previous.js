const Utils = require("../../utils/Utils");
const UserServices = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const previous = {
  name: "previous",
  group: commandGroup,
  emote: "⏮️",
  cmd: "previous",
  alias: "p",
  description: "Affecte l'utilisateur précédent à la boîte commune",
  usage: `<@Jaguar ${commandGroup.cmdName} previous>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} previous> - Affecte l'utilisateur précédent à la boîte commune.`,
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const { previous, current, next } = await Utils.getMemberOrderedList();
    if (!previous)
      return Messages.sendError(bot, "Il n'y a pas d'utilisateur précédent à affecter à la boîte commune !");

    await UserServices.setPointed(current.id, false);
    await UserServices.setPointed(next.id, true);

    Messages.sendSuccess(bot, `**${next.firstName} ${next.lastName}** a bien été affecté à la boîte commune !`);
  },
};

module.exports = previous;
