const configInstance = require("../../config/CustomConfig");
const ActionListeners = require("../../utils/ActionListener");
const LoggerInstance = require("../../utils/Logger");
const commandGroup = require("../GroupCommands/GroupCommand").SUPPORT_LIST_CATEGORY;

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

/** @type {import("../Commands").Command} */
const direction = {
  name: "direction",
  group: commandGroup,
  emote: "🔄",
  cmd: "direction",
  description: "Changer la direction du parcours de la liste de la boite",
  usage: `<@Jaguar ${commandGroup.cmdName} direction>\n\n**Exemple:**\n<@Jaguar ${commandGroup.cmdName} direction> - Ouvre la panel de changement de la direction du parcours de la liste de la boite commune. \nCela traduit de quelle manière, parmi tous les noms de la liste, le bot doit les parcourir chaque jour.`,
  priority: 100,
  /**
   * @param {Bot} bot
   * @param {Trigger} trigger
   */
  handler: async (bot, trigger) => {
    const currentTime = configInstance.getAnnoucementTime();
    // Copy the JSON to avoid modifying the original
    const embedJson = JSON.parse(JSON.stringify(EMBED_JSON_TEMPLATE));
    embedJson.body[1].value = currentTime;
    const msg = await bot.sendCard(
      embedJson,
      "This is customizable fallback text for clients that do not support buttons & cards"
    );

    ActionListeners.createNewListener(msg.id, async (bot, trigger, inputs) => {
      await configInstance.setOrder(inputs.direction);
      let direction = inputs.direction === "ASC" ? "Alphabétique Ascendant" : "Alphabétique Descendant";
      await bot.reply(
        trigger.attachmentAction,
        `La direction du parcours de la liste de la boite a été changée pour ${direction} !`
      );
      LoggerInstance.log(`La direction du parcours de la liste de la boite a été changée pour ${inputs.direction} !`);
    });
  },
};

module.exports = direction;
