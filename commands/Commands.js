const ping = require("./Ping");
const info = require("./Info");
const saysHi = require("./SaysHi");
const test = require("./Test");

/**
 * @typedef {Object} Command
 * @property {string} name - The name of the command
 * @property {string | null} cmd - The command to trigger the command
 * @property {string | null} alias - The alias of the command
 * @property {RegExp | null} regex - If the command input is a regex
 * @property {string} description - The description of the command
 * @property {number} priority - The priority of the command
 * @property {function} handler - The function to handle the command
 */

/**
 * List of commands
 * @type {Command[]}
 */
const Commands = [ping, info, saysHi, test];

// If one command does not have either a cmd or a regex, it will not be added to the list of commands and raise an error
Commands.forEach((cmd) => {
  if (!cmd.cmd && !cmd.regex) {
    throw new Error(
      `Command ${cmd.name} does not have a cmd or a regex and can't be called.`
    );
  }
});

// Sort commands by priority
Commands.sort((a, b) => a.priority - b.priority);

module.exports = Commands;