const { getUser } = require("../services/User/UserServices");
const UserServices = require("../services/User/UserServices");
const Utils = require("../utils/Utils");

/** @type {import("./Commands").Command} */
const removeFromBox = {
  name: "remove",
  emote: "📦",
  regex: /^remove.*/i,
  description: "Retire un utilisateur de la liste des personnes de la boite commune",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {string[]} args
   */
  handler: async (bot, args) => {
    if (args.length <= 1) return bot.say("❌ | Il faut au moins un argument !");

    const firstName = args[1];

    let member = await Utils.getMemberByName(bot, firstName);

    if (!member) return bot.say("❌ | Utilisateur non trouvé !");

    const lastName = member.personDisplayName.split(", ")[0];

    // Get the user from the database
    let user = await getUser(member.personId);
    if (!user)
      return bot.say(
        `❌ | L'Utilisateur ${firstName} ${lastName} n'est pas dans la liste pour la boite commune ! Merci de l'ajouter avec la commande \`add\` !`
      );

    UserServices.deleteUser(user.id);

    bot.say(
      "markdown",
      `✅ | **${user.firstName} ${user.lastName}** a bien été retiré à la liste pour la boite commune !`
    );
  },
};

module.exports = removeFromBox;