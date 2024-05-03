const { getScriptBoxAnnouncement } = require("./fireBoxAnnounce");
const CronScripts = require("../utils/CronScript");
const Framework = require("webex-node-bot-framework/lib/framework");

/**
 * @typedef {Object} Script
 * @property {string} id - The id of the script
 * @property {string} crontime - The crontime of the script
 * @property {Function} onTick - The script to execute on tick
 */

const getScripts = () => {
  return [getScriptBoxAnnouncement()];
};

/**
 * Create the cron scripts
 * @param {Framework} framework
 */
const createCronScripts = (framework) => {
  const Scripts = getScripts();

  Scripts.forEach((script) => {
    CronScripts.createNewCronScript(script.id, script.crontime, script.onTick, framework);
  });
};

const restartCronScripts = () => {
  const Scripts = getScripts();

  Scripts.forEach((script) => {
    CronScripts.stopCronScript(script.id);
  });

  createCronScripts();
};

exports.createCronScripts = createCronScripts;
exports.restartCronScripts = restartCronScripts;
exports.getScripts = getScripts;
