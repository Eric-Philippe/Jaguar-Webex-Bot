const onAttachmentActions = require("./onAttachmentActions");
const onMessage = require("./onMessage");

const Events = [onMessage, onAttachmentActions];

const subscribeEvents = (framework) => {
  Events.forEach((event) => event(framework));
};

module.exports = subscribeEvents;
