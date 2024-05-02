const Framework = require("webex-node-bot-framework/lib/framework");

/**
 * Function to run when an attachment action is received
 * @param {Framework} framework
 */
const onAttachmentActions = async (framework) => {
  framework.on("attachmentAction", (bot, trigger) => {
    bot.reply(trigger.attachmentAction, "Thanks for hitting the button");
  });
};

module.exports = onAttachmentActions;
