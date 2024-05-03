const { getUser, createUser } = require("../services/User/UserServices");

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
   */
  handler: async (bot, trigger) => {
    // Get what's after the command
    const args = trigger.text.split(" ").slice(1);
    if (args.length <= 1) return bot.say("❌ | Il faut au moins un argument !");

    const firstName = args[1];

    // Get all the members in the room
    const memberships = await bot.webex.memberships.list({
      roomId: bot.room.id,
    });
    const members = memberships.items.map(({ personId, personDisplayName }) => ({ personId, personDisplayName }));

    // Find the member in the room
    let member = members.find((member) => {
      return member.personDisplayName.toLowerCase().includes(firstName.toLowerCase());
    });

    if (!member) return bot.say("❌ | Utilisateur non trouvé !");

    const lastName = member.personDisplayName.split(", ")[0];

    // Get the user from the database
    let user = await getUser(member.personId);
    if (user)
      return bot.say(`❌ | L'Utilisateur ${firstName} ${lastName} est déjà dans la liste pour la boite commune !`);

    user = await createUser(member.personId, firstName, lastName);

    bot.say(`✅ | ${user.firstName} ${user.lastName} a bien été ajouté à la liste pour la boite commune !`);
  },
};

module.exports = addToBox;
