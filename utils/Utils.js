module.exports = class Utils {
  /**
   * Get a member by name from the webex room
   * @param {Bot} bot
   * @param {string} name
   * @returns {Promise<Object|undefined>} The member
   */
  static async getMemberByName(bot, name) {
    // Get all the members in the room
    const memberships = await bot.webex.memberships.list({
      roomId: bot.room.id,
    });
    const members = memberships.items.map(({ personId, personDisplayName }) => ({ personId, personDisplayName }));

    // Find the member in the room
    return members.find((member) => {
      return member.personDisplayName.toLowerCase().includes(name.toLowerCase());
    });
  }
};
