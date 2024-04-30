/** @type {import("./Commands").Command} */
const saysHi = {
  name: "saysHi",
  alias: "saysHi",
  cmd: "dis bonjour à tout le monde",
  description:
    "**dis bonjour à tout le monde**: (tout le monde reçoit un salut en utilisant un appel à l'API Webex)",
  priority: 0,
  handler: (bot, trigger) => {
    bot.webex.memberships
      .list({ roomId: bot.room.id })
      .then((memberships) => {
        for (const member of memberships.items) {
          if (member.personId === bot.person.id) {
            // Skip myself!
            continue;
          }
          let displayName = member.personDisplayName
            ? member.personDisplayName
            : member.personEmail;
          bot.say(`Hello ${displayName}`);
        }
      })
      .catch((e) => {
        console.error(`Call to sdk.memberships.get() failed: ${e.messages}`);
        bot.say("Hello everybody!");
      });
  },
};

module.exports = saysHi;
