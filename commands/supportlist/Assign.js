const Utils = require("../../utils/Utils");
const UserServices = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const assign = {
  name: "affecter",
  group: commandGroup,
  emote: "⬅️",
  regex: /^affecter.*/i,
  description: "Affecte un utilisateur à s'occupe de la boîte commune",
  usage: `<@Jaguar ${commandGroup.cmdName} affecter [Prénom]>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} affecter Eric> - Affecte l'utilisateur Eric à la boîte commune d'aujourd'hui.`,
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    // Check if the user entered a name
    if (args.length <= 1)
      return Messages.sendError(bot, "Merci de spécifier le prénom de l'utilisateur à affecter à la boîte commune !");
    const firstName = args[1];

    // Find the member from the webex space
    let member = await Utils.getMemberByName(bot, firstName);
    if (!member)
      return Messages.sendError(
        bot,
        `L'utilisateur **${firstName}** n'est pas dans la liste des membres de ce groupe !`
      );

    // Find the user in the database
    let user = await UserServices.getUser(member.personId);
    if (!user)
      return Messages.sendError(
        bot,
        `L'utilisateur **${firstName} ${
          member.personDisplayName.split(", ")[0]
        }** n'est pas dans la liste pour la boîte commune !`
      );

    // Check if the user is already pointed
    if (user.pointed) {
      await UserServices.setPointed(user.id, false);
      Messages.sendSuccess(bot, `**${user.firstName} ${user.lastName}** a bien été retiré de la boîte commune !`);
    } else {
      await UserServices.removePointedUsers();
      await UserServices.setPointed(user.id, true);
      Messages.sendSuccess(bot, `**${user.firstName} ${user.lastName}** a bien été affecté à la boîte commune !`);
    }
  },
};

module.exports = assign;
