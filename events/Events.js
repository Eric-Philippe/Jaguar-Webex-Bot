const Framework = require("webex-node-bot-framework/lib/framework");
const onAttachmentActions = require("./onAttachmentActions");
const onMessage = require("./onMessage");

// Set up here the events you want to subscribe to
const Events = [onMessage, onAttachmentActions];

/**
 * Subscribe the framework to all the targeted events
 * @param {Framework} framework
 */
const subscribeEvents = (framework) => {
  Events.forEach((event) => event(framework));
};

module.exports = subscribeEvents;
