const { db } = require("../../Database");
const User = require("./User");

module.exports = class UserServices {
  /**
   * Create a new user
   * @param {string} id - The ID of the user
   * @param {string} firstName - The first name of the user
   * @param {string} lastName - The last name of the user
   * @returns {Promise<User>} The created user
   */
  static async createUser(id, firstName, lastName) {
    return new Promise((res, rej) => {
      db.run(`INSERT INTO users (id, firstName, lastName) VALUES (?, ?, ?)`, [id, firstName, lastName], (err) => {
        if (err) return rej(err);
        else return res(new User(id, firstName, lastName));
      });
    });
  }

  /**
   * Delete a user from the database
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async deleteUser(id) {
    return new Promise((res, rej) => {
      db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
        return err ? rej(err) : res();
      });
    });
  }

  /**
   * Get a user from the database
   * @param {string} id - The ID of the user
   * @returns {Promise<User>} The user
   */
  static async getUser(id) {
    return new Promise((res, rej) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return rej(err);
        else {
          if (!row) return res(null);
          let user = new User(row.id, row.firstName, row.lastName, row.pointed);
          return res(user);
        }
      });
    });
  }

  /**
   * Get all users from the database
   * @returns {Promise<User[]>} The users
   */
  static async getUsers() {
    return new Promise((res, rej) => {
      db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) return rej(err);
        else {
          let users = rows.map((row) => {
            return new User(row.id, row.firstName, row.lastName, row.pointed);
          });

          // Sort them by first name
          users.sort((a, b) => {
            return a.firstName.localeCompare(b.firstName);
          });

          return res(users);
        }
      });
    });
  }

  /**
   * Set a user as pointed or not
   * @param {string} id - The ID of the user
   * @param {boolean} pointed - If the user is pointed
   * @returns {Promise<void>}
   */
  static async setPointed(id, pointed) {
    return new Promise((res, rej) => {
      db.run(`UPDATE users SET pointed = ? WHERE id = ?`, [pointed, id], (err) => {
        return err ? rej(err) : res();
      });
    });
  }

  /**
   * Remove every pointed user
   * @returns {Promise<void>}
   */
  static async removePointedUsers() {
    return new Promise((res, rej) => {
      db.run(`UPDATE users SET pointed = 0`, (err) => {
        return err ? rej(err) : res();
      });
    });
  }

  /**
   * Get the pointed user
   * @returns {Promise<User>}
   */
  static async getPointedUser() {
    return new Promise((res, rej) => {
      db.all(`SELECT * FROM users WHERE pointed = 1`, (err, rows) => {
        if (err) return rej(err);
        else {
          if (rows.length === 0) return res(null);

          let users = rows.map((row) => {
            return new User(row.id, row.firstName, row.lastName, row.pointed);
          });

          // Sort them by first name
          users.sort((a, b) => {
            return a.firstName.localeCompare(b.firstName);
          });

          return res(users[0]);
        }
      });
    });
  }
};
