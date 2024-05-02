const fs = require("fs");

/**
 * @class Logger
 * Logger class to log messages to a file
 */
class Logger {
  constructor() {
    this.logFilePath = "./Logs/Logs.log";
    this.errorLogFilePath = "./Logs/Error.log";
    this.checkAndCreateLogsDirectory();
  }

  /**
   * Logs a message to the log file
   * @param {string} message
   */
  log(message) {
    const formattedMessage = this.formatLogMessage(message);
    this.writeLogToFile(this.logFilePath, formattedMessage);
  }

  /**
   * Logs an error message to the error log file
   * @param {string} message
   * @param {string} exception
   */
  logError(message, exception) {
    const formattedErrorMessage = this.formatErrorLogMessage(
      message,
      exception
    );
    this.writeLogToFile(this.errorLogFilePath, formattedErrorMessage);
  }

  /**
   * Formats a log message with the current date
   * @param {string} message
   * @returns
   */
  formatLogMessage(message) {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    return `[INFO] - (${formattedDate}) - ${message}`;
  }

  /**
   * Formats an error log message with the current date
   * @param {string} message
   * @param {string} exception
   * @returns
   */
  formatErrorLogMessage(message, exception) {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedException = exception ? `\nException: ${exception}` : "";
    return `[ERROR] - (${formattedDate}) - ${message}${formattedException}`;
  }

  /**
   * Formats a date to a string
   * @param {Date} date
   * @returns
   */
  formatDate(date) {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  /**
   * Pads a number with a zero if it's less than 10
   * @param {number} value
   * @returns
   */
  padZero(value) {
    return value < 10 ? "0" + value : value;
  }

  /**
   * Writes a message to a file
   * @param {string} filePath
   * @param {string} message
   */
  writeLogToFile(filePath, message) {
    fs.appendFile(filePath, message + "\n", (err) => {
      if (err) throw err;
    });
  }

  /**
   * Checks if the Logs directory exists and creates it if it doesn't
   */
  checkAndCreateLogsDirectory() {
    if (!fs.existsSync("Logs")) {
      fs.mkdirSync("Logs");
    }
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, "");
    }
    if (!fs.existsSync(this.errorLogFilePath)) {
      fs.writeFileSync(this.errorLogFilePath, "");
    }
  }
}

/** @type {Logger} - New Opened Instance */
const LoggerInstance = new Logger();

module.exports = LoggerInstance;
