const fs = require("fs");

class Logger {
  constructor() {
    this.logFilePath = "./Logs/Logs.log";
    this.errorLogFilePath = "./Logs/Error.log";
    this.checkAndCreateLogsDirectory();
  }

  log(message) {
    const formattedMessage = this.formatLogMessage(message);
    this.writeLogToFile(this.logFilePath, formattedMessage);
  }

  logError(message, exception) {
    const formattedErrorMessage = this.formatErrorLogMessage(
      message,
      exception
    );
    this.writeLogToFile(this.errorLogFilePath, formattedErrorMessage);
  }

  formatLogMessage(message) {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    return `[INFO] - (${formattedDate}) - ${message}`;
  }

  formatErrorLogMessage(message, exception) {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedException = exception ? `\nException: ${exception}` : "";
    return `[ERROR] - (${formattedDate}) - ${message}${formattedException}`;
  }

  formatDate(date) {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  padZero(value) {
    return value < 10 ? "0" + value : value;
  }

  writeLogToFile(filePath, message) {
    fs.appendFile(filePath, message + "\n", (err) => {
      if (err) throw err;
    });
  }

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

module.exports = Logger;
