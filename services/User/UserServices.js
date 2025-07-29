const { query } = require("../../Database");
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
    try {
      await query(`INSERT INTO users (id, firstName, lastName) VALUES ($1, $2, $3)`, [id, firstName, lastName]);
      return new User(id, firstName, lastName);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  }

  /**
   * Delete a user from the database
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async deleteUser(id) {
    try {
      await query(`DELETE FROM users WHERE id = $1`, [id]);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
    }
  }

  /**
   * Get a user from the database
   * @param {string} id - The ID of the user
   * @returns {Promise<User|null>} The user
   */
  static async getUser(id) {
    try {
      const result = await query(`SELECT * FROM users WHERE id = $1`, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new User(row.id, row.firstname, row.lastname, row.pointed, row.is_absent);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
    }
  }

  /**
   * Get all users from the database
   * @returns {Promise<User[]|null>} The users
   */
  static async getUsers() {
    try {
      const result = await query(`SELECT * FROM users ORDER BY firstName ASC`);

      if (result.rows.length === 0) {
        return null;
      }

      const users = result.rows.map((row) => {
        return new User(row.id, row.firstname, row.lastname, row.pointed, row.is_absent);
      });

      return users;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
    }
  }

  /**
   * Set a user as pointed or not
   * @param {string} id - The ID of the user
   * @param {boolean} pointed - If the user is pointed
   * @returns {Promise<void>}
   */
  static async setPointed(id, pointed) {
    try {
      await query(`UPDATE users SET pointed = $1 WHERE id = $2`, [pointed, id]);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut pointed: ${error.message}`);
    }
  }

  /**
   * Remove every pointed user
   * @returns {Promise<void>}
   */
  static async removePointedUsers() {
    try {
      await query(`UPDATE users SET pointed = FALSE`);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression des utilisateurs pointés: ${error.message}`);
    }
  }

  /**
   * Get the pointed user
   * @returns {Promise<User|null>}
   */
  static async getPointedUser() {
    try {
      const result = await query(`SELECT * FROM users WHERE pointed = TRUE ORDER BY firstName ASC`);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new User(row.id, row.firstname, row.lastname, row.pointed, row.is_absent);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur pointé: ${error.message}`);
    }
  }

  /**
   * Set a user as absent or not
   * @param {string} id - The ID of the user
   * @param {boolean} isAbsent - If the user is absent
   * @returns {Promise<void>}
   */
  static async setAbsent(id, isAbsent) {
    try {
      await query(`UPDATE users SET is_absent = $1 WHERE id = $2`, [isAbsent, id]);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut d'absence: ${error.message}`);
    }
  }

  /**
   * Toggle the absence status of a user
   * @param {string} id - The ID of the user
   * @returns {Promise<void>}
   */
  static async toggleAbsent(id) {
    try {
      const user = await UserServices.getUser(id);
      if (!user) {
        throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
      }
      await UserServices.setAbsent(id, !user.isAbsent);
    } catch (error) {
      throw new Error(`Erreur lors de la bascule du statut d'absence: ${error.message}`);
    }
  }

  /**
   * Get all non-absent users
   * @returns {Promise<User[]|null>} The non-absent users
   */
  static async getNonAbsentUsers() {
    try {
      const result = await query(`SELECT * FROM users WHERE is_absent = FALSE ORDER BY firstName ASC`);

      if (result.rows.length === 0) {
        return null;
      }

      const users = result.rows.map((row) => {
        return new User(row.id, row.firstname, row.lastname, row.pointed, row.is_absent);
      });

      return users;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des utilisateurs non absents: ${error.message}`);
    }
  }
};
