/**
 * @typedef {Object} GroupCommand
 * @property {string} title - The title of the group command
 * @property {string} groupName - The name of the group command
 * @property {string} cmdName - The command name of the group command
 * @property {string} alias - The alias of the group command
 * @property {string} description - The description of the group command
 * @property {string} emote - The emote of the group command
 */

// ============================================================
// ============= DEFINE HERE YOUR GROUPS COMMAND ==============
// ============================================================

/** @type {GroupCommand} */
const SUPPORT_LIST_CATEGORY = {
  title: "Liste pour la boîte commune",
  cmdName: "supportlist",
  alias: "sl",
  description: "Commandes pour gérer la liste pour la boîte commune",
  emote: "📧",
};

exports.SUPPORT_LIST_CATEGORY = SUPPORT_LIST_CATEGORY;

exports.GroupCommands = [SUPPORT_LIST_CATEGORY];
