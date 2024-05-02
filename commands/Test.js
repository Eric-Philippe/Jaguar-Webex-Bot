/** @type {import("./Commands").Command} */
const test = {
  name: "test",
  alias: "t",
  cmd: "test",
  description: "**Test**: Just me minding my own business",
  priority: 0,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    bot.say("markdown", "Test");
  },
};

module.exports = test;
