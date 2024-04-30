const ping = require("./Ping");
const info = require("./Info");
const saysHi = require("./SaysHi");

/**
 * @typedef {Object} Command
 * @property name {string} - The name of the command
 * @property alias {string} - The alias of the command
 * @property cmd {string} - The command to trigger the command
 * @property description {string} - The description of the command
 * @property priority {number} - The priority of the command
 * @property handler {function} - The function to handle the command
 */

/**
 * List of commands
 * @type {Command[]}
 */
const Commands = [ping, info, saysHi];

module.exports = Commands;
