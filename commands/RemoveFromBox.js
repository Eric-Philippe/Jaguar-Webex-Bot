const { getUser } = require("../services/User/UserServices");
const UserServices = require("../services/User/UserServices");

/** @type {import("./Commands").Command} */
const removeFromBox = {
  name: "remove",
  emote: "📦",
  regex: /^remove.*/i,
  description: "Retire un utilisateur de la liste des personnes de la boite commune",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: async (bot, trigger) => {
    // Get what's after the command
    const args = trigger.text.split(" ").slice(1);
    if (args.length <= 1) return bot.say("❌ | Il faut au moins un argument !");

    const firstName = args[1];

    // Get all the members in the room
    const members = await bot.webex.memberships.list({ roomId: bot.room.id }).then((memberships) => {
      return memberships.items.map((membership) => {
        return {
          personId: membership.personId,
          personDisplayName: membership.personDisplayName,
        };
      });
    });

    // Find the member in the room
    let member = members.find((member) => {
      let splittedName = member.personDisplayName.split(", ");
      if (splittedName.length < 2) return false;

      return member.personDisplayName.split(", ")[1].localeCompare(firstName, undefined, { sensitivity: "base" }) == 0;
    });

    if (!member) return bot.say("❌ | Utilisateur non trouvé !");

    const lastName = member.personDisplayName.split(", ")[0];

    // Get the user from the database
    let user = await getUser(member.personId);
    if (!user)
      return bot.say(
        `❌ | L'Utilisateur ${firstName} ${lastName} n'est pas dans la liste pour la boite commune ! Merci de l'ajouter avec la commande \`add\` !`
      );

    UserServices.deleteUser(user.id);

    bot.say(`✅ | ${user.firstName} ${user.lastName} a bien été retiré à la liste pour la boite commune !`);
  },
};

module.exports = removeFromBox;
