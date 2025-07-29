const { Pool } = require("pg");

const { DEV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require("./config/config");

const LoggerInstance = require("./utils/Logger");

// PostgreSQL
const dbConfig = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000, // Idle timeout before closing
  connectionTimeoutMillis: 2000, // Connection timeout
};

// Pool creation
const pool = new Pool(dbConfig);

// Error handling for the pool
pool.on("error", (err) => {
  const errorMessage = `Erreur inattendue du pool PostgreSQL: ${err.message}`;
  if (DEV) {
    console.error(errorMessage);
  } else {
    LoggerInstance.logError(errorMessage);
  }
});

// Connection event
pool.on("connect", () => {
  if (DEV) {
    console.log("✅ Nouvelle connexion PostgreSQL établie");
  }
});

const createTable = () => {
  return new Promise(async (res, rej) => {
    const client = await pool.connect();

    try {
      // Create the 'users' table if it does not exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY NOT NULL,
          firstName VARCHAR(60) NOT NULL,
          lastName VARCHAR(60) NOT NULL,
          pointed BOOLEAN NOT NULL DEFAULT FALSE,
          is_absent BOOLEAN NOT NULL DEFAULT FALSE
        )
      `);

      if (DEV) {
        console.log("✅ Table 'users' créée/vérifiée avec succès");
      }

      res();
    } catch (err) {
      const errorMessage = `Erreur lors de la création de la table: ${err.message}`;
      if (DEV) {
        console.error(errorMessage);
      } else {
        LoggerInstance.logError(errorMessage);
      }
      rej(err);
    } finally {
      client.release();
    }
  });
};

const closeDB = async () => {
  try {
    await pool.end();
    console.log("✅ Pool de connexions PostgreSQL fermé");
  } catch (err) {
    console.error("❌ Erreur lors de la fermeture du pool:", err.message);
  }
};

// Fonction utilitaire pour exécuter des requêtes
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    const errorMessage = `Erreur lors de l'exécution de la requête: ${err.message}`;
    if (DEV) {
      console.error(errorMessage);
      console.error("Requête:", text);
      console.error("Paramètres:", params);
    } else {
      LoggerInstance.logError(errorMessage);
    }
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query,
  createTable,
  closeDB,
};
