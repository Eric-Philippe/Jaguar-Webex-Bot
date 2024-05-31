const sqlite3 = require("sqlite3").verbose();

const { DEV } = require("./config/config");

const LoggerInstance = require("./utils/Logger");

// Connect to the database
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    if (DEV) console.error("Error connecting to the database:", err.message);
    else LoggerInstance.logError("Error connecting to the database:", err.message);
  }
});

const createTable = () => {
  return new Promise((res, rej) => {
    // Create a table
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    pointed BOOLEAN NOT NULL DEFAULT 0
  )`,
        (err) => {
          if (err) return rej(err);
          else {
            // Uncomment this block to make any initial inserts / changes to the database
            // db.run(
            //   `INSERT INTO users (id, firstName, lastName) VALUES ('2', 'John', 'DOE')`,

            //   (err) => {
            //     return err ? rej(err) : res();
            //   }
            // );

            // db.run(
            //   `INSERT INTO users (id, firstName, lastName) VALUES ('3', 'Jane', 'DOE')`,

            //   (err) => {
            //     return err ? rej(err) : res();
            //   }
            // );

            // db.run(
            //   `INSERT INTO users (id, firstName, lastName) VALUES ('4', 'Foo', 'BAR')`,

            //   (err) => {
            //     return err ? rej(err) : res();
            //   }
            // );

            return res();
          }
        }
      );
    });
  });
};

const closeDB = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Closed the database.");
    }
  });
};

module.exports = {
  db,
  createTable,
  closeDB,
};
