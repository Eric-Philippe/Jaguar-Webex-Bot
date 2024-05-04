const { getUser, createUser } = require("../../services/User/UserServices");
const Messages = require("../../utils/Messages");
const Utils = require("../../utils/Utils");

const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const add = {
  name: "add",
  group: commandGroup,
  emote: "➕",
  regex: /^add.*/i,
  description: "Ajoute un utilisateur à la liste.",
  usage: `<@Jaguar ${commandGroup.cmdName} add [Prénom]>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} add Eric> - Ajoute l'utilisateur Eric à la liste des utilisateurs aptes à s'occuper de la boîte commune.`,
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    if (args.length <= 1)
      return Messages.sendError(bot, "Merci de spécifier le prénom de l'utilisateur à ajouter à la boite commune !");

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
    if (user)
      return Messages.sendError(
        bot,
        `L'Utilisateur **${firstName} ${lastName}** est déjà dans la liste pour la boite commune !`
      );

    user = await createUser(member.personId, firstName, lastName);

    Messages.sendSuccess(
      bot,
      `**${user.firstName} ${user.lastName}** a bien été ajouté à la liste pour la boite commune !`
    );
  },
};

module.exports = add;
