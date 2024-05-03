const Framework = require("webex-node-bot-framework/lib/framework");
const ActionListeners = require("../utils/ActionListener");

/**
 * Function to run when an attachment action is received
 * @param {Framework} framework
 */
const onAttachmentActions = (framework) => {
  framework.on("attachmentAction", async (bot, trigger) => {
    const args = trigger.attachmentAction.inputs;
    if (!args) return;

    ActionListeners.findAndRunListener(bot, trigger);
  });
};

module.exports = onAttachmentActions;
