const LoggerInstance = require("./Logger");

const THREE_HOURS = 1000 * 60 * 60 * 3;

/**
 * @typedef {Object} Listener
 * @property {string} msgId - The message to listen
 * @property {Date} createdAt - The date of creation
 * @property {number} time - The time to listen in milliseconds
 * @property {number} max - The maximum number of times to listen
 * @property {number} count - The number of times listened
 * @property {Function} callback - The callback to execute
 */

class ActionListener {
  constructor() {
    /** @type {Listener[]} */
    this.listeners = [];
  }

  /**
   * Create a new Submit Action listener for a message
   * @param {string} msgId
   * @param {Function} callback
   * @param {number} time
   * @param {number} max
   * @returns
   */
  createNewListener(msgId, callback, time = THREE_HOURS, max = 1) {
    if (this.getListener(msgId)) return;
    const listener = {
      msgId: msgId,
      createdAt: new Date(),
      time,
      max,
      count: 0,
      callback,
    };
    this.listeners.push(listener);

    setTimeout(() => {
      this.listeners = this.listeners.filter((l) => l.msgId !== listener.msgId);
    }, time);
    return listener;
  }

  /**
   * Return the listener for a message, if any exists
   * @param {string} msgId
   * @returns {Listener|undefined} The listener, undefined if not found
   */
  getListener(msgId) {
    return this.listeners.find((l) => l.msgId === msgId);
  }

  /**
   * Run the listener for a message
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  findAndRunListener(bot, trigger) {
    const listener = this.getListener(trigger.attachmentAction.messageId);
    if (!listener) return;

    const inputs = trigger.attachmentAction.inputs;

    listener.count += 1;
    try {
      listener.callback(bot, trigger, inputs);
    } catch (error) {
      LoggerInstance.logError("Error while running listener", error);
    }
    if (listener.count >= listener.max) {
      this.listeners = this.listeners.filter((l) => l.msgId !== listener.msgId);
    }
  }
}

const ActionListeners = new ActionListener();

module.exports = ActionListeners;
