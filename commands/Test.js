/** @type {import("./Commands").Command} */
const hi = {
  name: "hi",
  regex: /hi|salut|hello|bonjour/,
  cmd: "test",
  description: "**Test**: Me testing things",
  priority: 0,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    let t = /hi/i;
    console.log(bot);
    bot.say("markdown", "Hi.");
  },
};

module.exports = hi;
