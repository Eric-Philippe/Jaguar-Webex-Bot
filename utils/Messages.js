const Bot = require("webex-node-bot-framework/lib/bot");
const EmbedBuilder = require("./Embed");

module.exports = class Messages {
  /**
   * Send a message to a room
   * @param {Bot} bot
   * @returns {Promise<Message|undefined>}
   */
  static send(bot, text, title = null) {
    const embed = new EmbedBuilder();

    if (title) embed.setSubtitle(title);
    embed.addDescription(text).setFooter("🤖 - Jaguar Team - Webex Bot");

    try {
      return bot.sendCard(embed, "Card Not Sent");
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static sendSuccess(bot, text) {
    let description = "✅ | " + text;
    this.send(bot, description, "📝 | Succès");
  }

  static sendError(bot, text) {
    let description = "❌ | " + text;
    this.send(bot, description, "🚫 | Erreur");
  }

  static sendInfo(bot, text) {
    let description = "ℹ️ | " + text;
    this.send(bot, description, "📝 | Information");
  }
};
