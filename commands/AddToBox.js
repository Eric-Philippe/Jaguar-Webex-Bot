const { getUser, createUser } = require("../services/User/UserServices");
const Utils = require("../utils/Utils");

/** @type {import("./Commands").Command} */
const addToBox = {
  name: "add",
  emote: "📦",
  regex: /^add.*/i,
  description: "Ajoute un utilisateur a la liste des personnes de la boite commune",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   * @param {string[]} args
   */
  handler: async (bot, trigger, args) => {
    if (args.length <= 1) return bot.say("❌ | Il faut au moins un argument !");

    const firstName = args[1];

    // Get all the members in the room
    let member = await Utils.getMemberByName(bot, firstName);

    if (!member) return bot.say("❌ | Utilisateur non trouvé !");

    const lastName = member.personDisplayName.split(", ")[0];

    // Get the user from the database
    let user = await getUser(member.personId);
    if (user)
      return bot.say(
        "markdown",
        `❌ | L'Utilisateur **${firstName} ${lastName}** est déjà dans la liste pour la boite commune !`
      );

    user = await createUser(member.personId, firstName, lastName);

    bot.say(
      "markdown",
      `✅ | **${user.firstName} ${user.lastName}** a bien été ajouté à la liste pour la boite commune !`
    );
  },
};

module.exports = addToBox;
