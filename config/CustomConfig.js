const fs = require("fs");

const { ORDER, ANNOUNCEMENT_TIME } = require("./config.json").CONFIG;

/**
 * Class to handle the configuration that is
 * able to be changed by the user without restarting the bot
 */
class CustomConfig {
  /**
   * Create a new CustomConfig
   */
  constructor() {
    this.annoucement_time = ANNOUNCEMENT_TIME;
    this.order = ORDER;
  }

  /**
   * Get the time of the annoucement
   * @returns {string} The time of the annoucement
   */
  getAnnoucementTime() {
    return this.annoucement_time;
  }

  /**
   * Get the order of the announcements
   * @returns {'ASC' | 'DESC'} The order of the announcements
   */
  getOrder() {
    return this.order;
  }

  /**
   * Set the time of the annoucement
   * @param {string} time
   */
  setAnnoucementTime(time) {
    // Must be an hour like so : "HH:MM"
    if (!/^\d{2}:\d{2}$/.test(time)) {
      throw new Error("Time must be in the format HH:MM");
    }
    this.annoucement_time = time;

    return this.saveToJson();
  }

  /**
   * Set the order of the announcements
   * @param {'ASC' | 'DESC'} order - Must be 'ASC' or 'DESC
   */
  async setOrder(order) {
    // Must be "ASC" or "DESC
    if (!["ASC", "DESC"].includes(order)) {
      throw new Error("Order must be 'ASC' or 'DESC'");
    }
    this.order = order;

    return await this.saveToJson();
  }

  /**
   * Save the current configuration to the config.json file
   */
  async saveToJson() {
    const data = JSON.stringify(
      {
        CONFIG: {
          ORDER: this.order,
          ANNOUNCEMENT_TIME: this.annoucement_time,
        },
      },
      null,
      2
    );

    await fs.promises.writeFile("./config/config.json", data);

    return data;
  }
}

module.exports = new CustomConfig();
