const { db } = require("../Database");

/**
 * @class User
 * @description class representing a user in the database
 */
class User {
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
    await createUser(this.id, this.firstName, this.lastName);
  }

  /**
   * @method setPointed
   * @description Set the user as pointed
   */
  async setPointed() {
    await setPointed(this.id, true);
    this.pointed = true;
  }

  /**
   * @method unsetPointed
   * @description Set the user as not pointed
   */
  async unsetPointed() {
    await setPointed(this.id, false);
    this.pointed = false;
  }

  /**
   * @method delete
   * @description Delete the user from the database
   */
  async delete() {
    await deleteUser(this.id);
  }

  /**
   * @method get
   * @description Get a user from the database
   */
  static async get(id) {
    const user = await getUser(id);
    return new User(user.id, user.firstName, user.lastName);
  }
}

const createUser = (id, firstName, lastName) => {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO users (id, firstName, lastName) VALUES (?, ?, ?)`,
      [id, firstName, lastName],
      (err) => {
        if (err) return rej(err);
        else return res(new User(id, firstName, lastName));
      }
    );
  });
};

const getUser = (id) => {
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
};

const setPointed = (id, pointed) => {
  return new Promise((res, rej) => {
    db.run(
      `UPDATE users SET pointed = ? WHERE id = ?`,
      [pointed, id],
      (err) => {
        return err ? rej(err) : res();
      }
    );
  });
};

const getUsers = () => {
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
};

const getPointedUsers = () => {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM users WHERE pointed = 1`, (err, rows) => {
      if (err) return rej(err);
      else {
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
};

const deleteUser = (id) => {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
      return err ? rej(err) : res();
    });
  });
};

module.exports = {
  getUser,
  getUsers,
  getPointedUsers,
  createUser,
};
