const EmbedBuilder = require("../utils/Embed");

/** @type {import("./Commands").Command} */
const test = {
  name: "test",
  emote: "🧪",
  alias: "t",
  cmd: "test",
  description: "Just me minding my own business",
  priority: 0,
  /**
   * @param {Bot} bot
   */
  handler: (bot) => {
    const embed = new EmbedBuilder()
      .setDescription("This is a test")
      .addListElements([
        { key: "Key 1", value: "Value 1" },
        { key: "Key 2", value: "Value 2" },
      ])
      .addLinkButton("Link", "https://google.com");
    bot.sendCard(embed.toJSON(), "adaptiveCard");
  },
};

module.exports = test;
