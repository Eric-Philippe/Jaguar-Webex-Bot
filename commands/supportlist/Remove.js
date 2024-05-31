const { getUser } = require("../../services/User/UserServices");
const UserServices = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const Utils = require("../../utils/Utils");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const remove = {
  name: "remove",
  group: commandGroup,
  emote: "🧹",
  regex: /^remove.*/i,
  description: "Retire un utilisateur de la liste des personnes de la boite commune",
  usage: `<@Jaguar ${commandGroup.cmdName} remove [Prénom]>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} remove Eric> - Retire l'utilisateur Eric de la liste des utilisateurs aptes à s'occuper de la boîte commune.`,
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    if (args.length <= 1)
      return Messages.sendError(bot, "Merci de spécifier le prénom de l'utilisateur à retirer de la boite commune !");

    const firstName = args[1];

    let member = await Utils.getMemberByName(bot, firstName);

    if (!member)
      return Messages.sendError(
        bot,
        `L'Utilisateur **${firstName}** n'est pas dans la liste des membres de ce groupe !`
      );

    const lastName = member.personDisplayName.split(", ")[0];

    // Get the user from the database
    let user = await getUser(member.personId);
    if (!user)
      return Messages.sendError(
        bot,
        `L'Utilisateur **${firstName} ${lastName}** n'est pas dans la liste pour la boite commune ! Merci de l'ajouter avec la commande \`add\` !`
      );

    UserServices.deleteUser(user.id);

    Messages.sendSuccess(
      bot,
      `**${user.firstName} ${user.lastName}** a bien été retiré à la liste pour la boite commune !`
    );
  },
};

module.exports = remove;
