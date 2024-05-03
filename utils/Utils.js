const configInstance = require("../config/CustomConfig");
const UserServices = require("../services/User/UserServices");
const User = require("../services/User/User");

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

  /**
   * Get the order of the users
   * @returns {Promise<{previous: User, current: User, next: User}>}
   */
  static async getMemberOrderedList() {
    let users = await UserServices.getUsers();
    if (users == null || users.length == 0) return { previous: null, current: null, next: null };

    const order = configInstance.getOrder();

    // Order the users by first name depending on the pre-defined order
    users = users.sort((a, b) => {
      if (order === "ASC") {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });

    let currentUser = users.find((user) => user.pointed === true);
    if (!currentUser) currentUser = users[0];

    // Get the previous, current and next users
    const currentUserIndex = users.findIndex((user) => user.id === currentUser.id);
    const previousUserIndex = currentUserIndex ? currentUserIndex - 1 : users.length - 1;
    const nextUserIndex = currentUserIndex === users.length - 1 ? 0 : currentUserIndex + 1;

    return {
      previous: users[previousUserIndex],
      current: users[currentUserIndex],
      next: users[nextUserIndex],
    };
  }
};
