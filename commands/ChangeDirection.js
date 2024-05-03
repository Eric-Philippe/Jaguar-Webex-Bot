const configInstance = require("../config/CustomConfig");

const EMBED_JSON_TEMPLATE = {
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  type: "AdaptiveCard",
  version: "1.3",
  body: [
    {
      type: "Container",
      items: [
        {
          type: "TextBlock",
          text: "Changer la direction du parcours de la liste de la boîte commune",
          weight: "Bolder",
          size: "Medium",
        },
      ],
    },
    {
      type: "Input.ChoiceSet",
      choices: [
        {
          title: "Alphabétique Ascendant",
          value: "ASC",
        },
        {
          title: "Alphabétique Descendant",
          value: "DESC",
        },
      ],
      placeholder: "Placeholder text",
      style: "expanded",
      isRequired: true,
      errorMessage: "Merci de séléctionner un élément",
      value: "0",
      id: "direction",
    },
  ],
  actions: [
    {
      type: "Action.Submit",
      title: "OK",
    },
  ],
};

/** @type {import("./Commands").Command} */
const changeDirection = {
  name: "changeDirection",
  emote: "🕒",
  cmd: "changeDirection",
  description: "Changer la direction du parcours de la liste de la boite",
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: (bot, trigger) => {
    const currentTime = configInstance.getAnnoucementTime();
    // Copy the JSON to avoid modifying the original
    const embedJson = JSON.parse(JSON.stringify(EMBED_JSON_TEMPLATE));
    embedJson.body[1].value = currentTime;
    bot.sendCard(embedJson, "This is customizable fallback text for clients that do not support buttons & cards");
  },
};

module.exports = changeDirection;
