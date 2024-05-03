const HI_ANSWERS = [
  "Hi",
  "Hello",
  "Salut",
  "Bonjour",
  "Hey",
  "Yo",
  "Hi there",
  "Hi!",
  "Hello!",
  "Salut!",
  "Bonjour!",
  "Hey!",
  "Yo!",
  "J'espère que tu vas bien",
];
const HI_EMOTES = ["✨", "🤩", "", "🌟", "🌝", "🙂", "👀"];

/** @type {import("./Commands").Command} */
const hi = {
  name: "hi",
  emote: "👋",
  regex: /hi|salut|hello|bonjour/i,
  cmd: "hi",
  description: "Saluer le bot.",
  priority: 0,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    const randomAnswer = HI_ANSWERS[Math.floor(Math.random() * HI_ANSWERS.length)];
    const randomEmote = HI_EMOTES[Math.floor(Math.random() * HI_EMOTES.length)];

    bot.say("markdown", `${randomEmote} ${randomAnswer} **${trigger.person.displayName}** !`);
  },
};

module.exports = hi;
