const { CronJob } = require("cron");
const Framework = require("webex-node-bot-framework/lib/framework");

/**
 * @class
 * @classdesc A class to manage cron scripts
 */
class CronScript {
  constructor() {
    this.cronScripts = [];
  }

  /**
   * Set the framework
   * @param {Framework} framework
   */
  setFramework(framework) {
    this.framework = framework;
    console.log("Framework set");
  }

  /**
   * Create a new cron script
   * @warning If a cron script with the same id already exists, it will be replaced
   * @param {string} id
   * @param {string} crontime
   * @param {Function} onTick
   */
  createNewCronScript(id, crontime, onTick) {
    if (this.#getCronScript(id)) this.stopCronScript(id);
    let framework = this.framework;

    let cron = new CronJob(
      crontime,
      function () {
        onTick(framework);
      },
      null,
      true,
      "Europe/Paris"
    );

    this.cronScripts.push({ id, cron });
  }

  /**
   * Stop and Remove a cron script from the list
   * @param {string} id - The id of the cron script to remove
   * @returns
   */
  stopCronScript(id) {
    const cronScript = this.#getCronScript(id);
    if (!cronScript) return;

    cronScript.cron.stop();
  }

  /**
   * Get a cron script by its id
   * @param {string} id - The id of the cron script to get
   * @returns {{ id: string, cron: CronJob}|undefined}
   */
  #getCronScript(id) {
    return this.cronScripts.find((script) => script.id === id);
  }
}

const CronScripts = new CronScript();

module.exports = CronScripts;
