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
          text: "Changer l'heure de l'annonce",
          weight: "bolder",
          size: "medium",
        },
      ],
    },
    {
      type: "Input.Time",
      label: "Merci de séléctionner une heure :",
      id: "time",
      min: "08:00",
      max: "19:00",
      value: "09:00",
      isRequired: true,
      separator: true,
      errorMessage: "Merci d'entrer une heure valide !",
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
const changeTime = {
  name: "changeTime",
  emote: "🕒",
  cmd: "changeTime",
  description: "Changer l'heure de l'annonce",
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

module.exports = changeTime;
