const EmbedBuilder = require("../utils/Embed");

/** @type {import("./Commands").Command} */
const test = {
  name: "test",
  emote: "🧪",
  alias: "t",
  cmd: "test",
  description: "Just me minding my own business",
  usage: `<@Jaguar test>\n\n**Exemple:**\n<@Jaguar test> - Just me minding my own business`,
  priority: 0,
  /**
   * @param {Bot} bot
   */
  handler: (bot, trigger) => {
    console.log(bot);
    console.log(trigger);
  },
};

module.exports = test;
