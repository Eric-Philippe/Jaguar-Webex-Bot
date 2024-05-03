const Utils = require("../utils/Utils");
const UserServices = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const assign = {
  name: "affecter",
  emote: "📦",
  regex: /^affecter.*/i,
  description: "Affecte un utilisateur à la boîte commune",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    // Check if the user entered a name
    if (args.length <= 1) return bot.say("❌ | Il faut au moins un argument !");
    const firstName = args[1];

    // Find the member from the webex space
    let member = await Utils.getMemberByName(bot, firstName);
    if (!member) return bot.say("❌ | Utilisateur non trouvé !");

    // Find the user in the database
    let user = await UserServices.getUser(member.personId);
    if (!user)
      return bot.say(
        `❌ | L'utilisateur ${firstName} n'est pas dans la liste pour la boîte commune ! Merci de l'ajouter avec la commande \`ajouter\` !`
      );

    // Check if the user is already pointed
    if (user.pointed) {
      await UserServices.setPointed(user.id, false);
      bot.say("markdown", `✅ | **${user.firstName} ${user.lastName}** a bien été désaffecté de la boîte commune !`);
    } else {
      await UserServices.removePointedUsers();
      await UserServices.setPointed(user.id, true);
      bot.say("markdown", `✅ | **${user.firstName} ${user.lastName}** a bien été affecté à la boîte commune !`);
    }
  },
};

module.exports = assign;
