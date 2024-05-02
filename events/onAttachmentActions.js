const onAttachmentActions = async (framework) => {
  framework.on("attachmentAction", (bot, trigger) => {
    bot.reply(trigger.attachmentAction, "Thanks for hitting the button");
  });
};

module.exports = onAttachmentActions;
