const { getUser, toggleAbsent } = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const Utils = require("../../utils/Utils");

const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const absent = {
  name: "absent",
  group: commandGroup,
  emote: "🏖️",
  regex: /^absent.*/i,
  description: "Active/désactive le statut d'absence pour ne pas être appelé pour la boîte commune.",
  usage: `<@Jaguar ${commandGroup.cmdName} absent [Prénom]>\n\n**Exemples:**\n<@Jaguar ${commandGroup.cmdName} absent> - Active/désactive votre propre statut d'absence\n<@Jaguar ${commandGroup.cmdName} absent Eric> - Active/désactive le statut d'absence d'Eric`,
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    let targetUserId = trigger.person.id;
    let targetName = trigger.person.displayName;

    // If a name is provided, find that user
    if (args.length > 1) {
      const firstName = args[1];
      const member = await Utils.getMemberByName(bot, firstName);

      if (!member) {
        return Messages.sendError(
          bot,
          `L'utilisateur **${firstName}** n'est pas dans la liste des membres de ce groupe !`
        );
      }

      targetUserId = member.personId;
      targetName = member.personDisplayName;
    }

    // Check if the user exists in the database
    const user = await getUser(targetUserId);
    if (!user) {
      return Messages.sendError(bot, `L'utilisateur **${targetName}** n'est pas dans la liste pour la boîte commune !`);
    }

    // Toggle the absent status
    await toggleAbsent(targetUserId);

    // Get the updated user to check the new status
    const updatedUser = await getUser(targetUserId);
    const statusText = updatedUser.isAbsent ? "absent" : "présent";
    const statusEmote = updatedUser.isAbsent ? "🏖️" : "";

    Messages.sendSuccess(
      bot,
      `${statusEmote} **${updatedUser.firstName} ${updatedUser.lastName}** est maintenant marqué(e) comme **${statusText}** pour la boîte commune !`
    );
  },
};

module.exports = absent;
