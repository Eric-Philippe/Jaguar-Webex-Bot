/** @type {import("./Commands").Command} */
const ping = {
  name: "ping",
  emote: "🏓",
  alias: "p",
  cmd: "ping",
  description: "Commencer une partie de ping-pong",
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
