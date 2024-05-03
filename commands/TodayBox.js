const EmbedBuilder = require("../utils/Embed");
const Utils = require("../utils/Utils");

/** @type {import("./Commands").Command} */
const today = {
  name: "today",
  emote: "",
  alias: "t",
  cmd: "today",
  description: "Afficher la personne s'occupant de la boite commune aujourd'hui",
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const members = await Utils.getMemberOrderedList();

    const embed = new EmbedBuilder()
      .setTitle("📧 | Boite commune")
      .setDescription(
        `🔵 La personne s'occupant de la boite commune aujourd'hui est **${members.current.firstName} ${members.current.lastName}**`
      )
      .setFooter("demain, ce sera au tour de **" + members.next.firstName + " " + members.next.lastName + "**");

    bot.sendCard(embed, "Boite commune");
  },
};

module.exports = today;
