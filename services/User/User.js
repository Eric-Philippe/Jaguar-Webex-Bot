const UserServices = require("./UserServices");

/**
 * @class User
 * @description class representing a user in the database
 */
module.exports = class User {
  constructor(id, firstName, lastName, pointed = false) {
    if (!id || !firstName || !lastName) throw new Error("Missing parameters");
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.pointed = pointed;
  }

  /**
   * @method save
   * @description Save the user in the database
   */
  async save() {
    await UserServices.createUser(this.id, this.firstName, this.lastName);
  }

  /**
   * @method setPointed
   * @description Set the user as pointed
   */
  async setPointed() {
    await UserServices.setPointed(this.id, true);
    this.pointed = true;
  }

  /**
   * @method unsetPointed
   * @description Set the user as not pointed
   */
  async unsetPointed() {
    await UserServices.setPointed(this.id, false);
    this.pointed = false;
  }

  /**
   * @method delete
   * @description Delete the user from the database
   */
  async delete() {
    await UserServices.deleteUser(this.id);
    // We don't need to delete the user object, it will be garbage collected
  }
};
