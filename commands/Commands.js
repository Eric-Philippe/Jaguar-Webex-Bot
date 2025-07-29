/**
 * @typedef {Object} Command
 * @property {string} name - The name of the command
 * @property {import("./GroupCommands/GroupCommand").GroupCommand | null} group - The group of the command
 * @property {string} emote - The emote of the command
 * @property {string | null} cmd - The command to trigger the command
 * @property {string | null} alias - The alias of the command
 * @property {RegExp | null} regex - If the command input is a regex
 * @property {string} description - The description of the command
 * @property {string} usage - The usage of the command in markdown with examples
 * @property {number} priority - The priority of the command
 * @property {Function} handler - The function to handle the command
 */

const help = require("./misc/Help");
const hi = require("./misc/Hi");
const info = require("./misc/Info");
const ping = require("./misc/Ping");
const add = require("./supportlist/Add");
const assign = require("./supportlist/Assign");
const list = require("./supportlist/List");
const next = require("./supportlist/Next");
const previous = require("./supportlist/Previous");
const remove = require("./supportlist/Remove");
const today = require("./supportlist/Today");
const time = require("./supportlist/time");
const direction = require("./supportlist/direction");
const absent = require("./supportlist/Absent");
const test = require("./misc/Test");

/**
 * List of commands
 * @type {Command[]}
 */
const Commands = [
  ping,
  info,
  hi,
  help,
  test,
  add,
  list,
  remove,
  assign,
  next,
  previous,
  today,
  time,
  direction,
  absent,
];

// If one command does not have either a cmd or a regex, it will not be added to the list of commands and raise an error
Commands.forEach((cmd) => {
  if (!cmd.cmd && !cmd.regex) {
    throw new Error(`Command ${cmd.name} does not have a cmd or a regex and can't be called.`);
  }
});

// Sort commands by priority, allowing to rank them if two commands have the same priority
// and also permitting to order them when we display the list of commands
Commands.sort((a, b) => a.priority - b.priority);

module.exports = Commands;
