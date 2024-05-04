/** @type {import("./Commands").Command} */
const ping = {
  name: "ping",
  emote: "🏓",
  cmd: "ping",
  description: "Commencer une partie de ping-pong",
  usage: `<@Jaguar ping>\n\n**Exemple:**\n<@Jaguar ping> - Répond pong`,
  priority: 0,
  /**
   * @param {Bot} bot
   */
  handler: (bot) => {
    bot.say("markdown", "🏓 Pong 🏓");
  },
};

module.exports = ping;
