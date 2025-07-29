const { createNextPreviousListener } = require("../../utils/ButtonsListener");
const EmbedBuilder = require("../../utils/Embed");
const Utils = require("../../utils/Utils");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

/** @type {import("../Commands").Command} */
const today = {
  name: "today",
  group: commandGroup,
  emote: "🔵",
  alias: "t",
  cmd: "today",
  description: "Afficher la personne s'occupant de la boite commune aujourd'hui",
  usage: `<@Jaguar ${commandGroup.cmdName} today>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} today> - Afficher la personne s'occupant de la boite commune aujourd'hui`,
  priority: 100,
  /**
   * @param {Bot} bot
   */
  handler: async (bot) => {
    const members = await Utils.getMemberOrderedList();

    const embed = new EmbedBuilder()
      .setTitle("📧 | Boite commune")
      .addDescription(
        `🔵 La personne s'occupant de la boite commune aujourd'hui est **${members.current.firstName} ${members.current.lastName}**`
      )
      .setFooter("demain, ce sera au tour de **" + members.next.firstName + " " + members.next.lastName + "**");

    embed.addSubmitButton("⏮️ Previous", { action: "sl_previous" });
    embed.addSubmitButton("⏭️ Next", { action: "sl_next" });

    const msg = await bot.sendCard(embed, "Boite commune");

    // Démarrer la récursion avec le premier message
    createNextPreviousListener(msg.id);
  },
};

module.exports = today;
