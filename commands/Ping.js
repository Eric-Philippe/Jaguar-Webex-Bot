/** @type {import("./Commands").Command} */
const ping = {
  name: "ping",
  alias: "p",
  cmd: "ping",
  description: "**Ping**: Commencer une partie de ping-pong",
  priority: 0,
  handler: (bot, trigger) => {
    bot.say("markdown", "🏓 Pong 🏓");
  },
};

module.exports = ping;
