const Bot = require("webex-node-bot-framework/lib/bot");
const EmbedBuilder = require("./Embed");

module.exports = class Messages {
  /**
   * Send a message to a room
   * @param {Bot} bot
   * @returns {Promise<Message|undefined>}
   */
  static async send(bot, text, title = null) {
    const embed = new EmbedBuilder();

    if (title) embed.setSubtitle(title);
    embed.addDescription(text).setFooter("🤖 - Jaguar Team - Webex Bot");

    try {
      return await bot.sendCard(embed, "Card Not Sent");
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static async sendSuccess(bot, text) {
    let description = "✅ | " + text;
    return await this.send(bot, description, "📝 | Succès");
  }

  static async sendError(bot, text) {
    let description = "❌ | " + text;
    return await this.send(bot, description, "🚫 | Erreur");
  }

  static async sendInfo(bot, text) {
    let description = "ℹ️ | " + text;
    return await this.send(bot, description, "📝 | Information");
  }
};
