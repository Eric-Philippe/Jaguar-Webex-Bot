/** @type {import("./Commands").Command} */
const ping = {
  name: "ping",
  alias: "p",
  cmd: "ping",
  description: "**Ping**: Commencer une partie de ping-pong",
  priority: 0,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    bot.say("markdown", "🏓 Pong 🏓");
  },
};

module.exports = ping;
