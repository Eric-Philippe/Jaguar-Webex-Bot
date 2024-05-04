/**
 * @class EmbedBuilder
 * @description A class to build an adaptive card JSON object
 */
module.exports = class EmbedBuilder {
  /** @constructor Create a new EmbedBuilder */
  constructor() {
    this.json = EmbedBuilder.getJsonTemplate();
  }

  /**
   * @description Get the JSON template of an adaptive card
   * @warning Working with a JSON const makes the const changeable, so we need to create a new object each time we want to use it
   * @returns {Object} The JSON template of an adaptive card
   */
  static getJsonTemplate() {
    return {
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      type: "AdaptiveCard",
      version: "1.3",
      body: [
        {
          type: "Container",
          items: [],
          $part: "header",
        },
        {
          type: "Container",
          items: [],
          $part: "body",
        },
      ],
      actions: [],
    };
  }

  /**
   * Set the title of the embed
   * @param {string} title
   * @returns {EmbedBuilder}
   */
  setTitle(title) {
    let titleItem = { ...TITLE_ITEM_TEMPLATE };
    titleItem.text = title;
    this.#setOnHeader(titleItem);
    return this;
  }

  /**
   * Set the author of the embed
   * @param {string} author - The name of the author
   * @param {string} subText - The subtext of the author
   * @param {string} imageUrl - The URL of the author's image
   * @returns
   */
  setAuthor(author, subText, imageUrl) {
    let authorItem = { ...AUTHOR_ITEM_TEMPLATE };
    authorItem.columns[1].items[0].text = author;
    authorItem.columns[1].items[1].text = subText;
    authorItem.columns[0].items[0].url = imageUrl;
    this.#setOnHeader(authorItem);
    return this;
  }

  /**
   * Set the description of the embed
   * @param {string} description
   * @returns
   */
  addDescription(description) {
    let descriptionItem = { ...DESCRIPTION_ITEM_TEMPLATE };
    descriptionItem.text = description;
    this.#setOnBody(descriptionItem);
    return this;
  }

  /**
   * Set the subtitle of the embed
   * @param {string} subtitle
   * @returns
   */
  setSubtitle(subtitle) {
    let subtitleItem = { ...SUBTITLE_ITEM_TEMPLATE };
    subtitleItem.text = subtitle;
    this.#setOnBody(subtitleItem);
    return this;
  }

  /**
   * Add a list element to the embed body
   * @param {KeyValue[]} list - An array of key-value pairs
   */
  addListElements(list) {
    let listItem = { ...LIST_ITEM_TEMPLATE };
    listItem.facts = list.map((item) => {
      return {
        title: item.key,
        value: item.value,
      };
    });
    this.#setOnBody(listItem);
    return this;
  }

  /**
   * Add a link element to the embed body
   * @param {string} description - The label of the link
   * @param {string} url - The URL of the link
   * @returns
   */
  addLinkElement(description, url) {
    let linkItem = { ...LINK_ITEM_TEMPLATE };
    linkItem.columns[1].items[0].text = `[${description}](${url})`;
    this.#setOnBody(linkItem);
    return this;
  }

  /**
   * Set the footer of the embed
   * @param {string} footer  - The text of the footer
   * @returns
   */
  setFooter(footer) {
    let footerItem = { ...FOOTER_TEMPLATE };
    footerItem.text = footer;
    this.json.body.push(footerItem);
    return this;
  }

  /**
   * Add a link button to the embed
   * @param {string} title - The title of the button
   * @param {string} url - The URL of the button
   */
  addLinkButton(title, url) {
    let button = { ...BUTTON_URL_TEMPLATE };
    button.title = title;
    button.url = url;
    this.json.actions.push(button);
    return this;
  }

  #setOnHeader(jsonObj) {
    this.json.body[0].items.push(jsonObj);
  }

  #setOnBody(jsonObj) {
    this.json.body[1].items.push(jsonObj);
  }

  toJSON() {
    return this.json;
  }
};

const TITLE_ITEM_TEMPLATE = {
  type: "TextBlock",
  text: "",
  weight: "bolder",
  size: "extraLarge",
};

const SUBTITLE_ITEM_TEMPLATE = {
  type: "TextBlock",
  text: "",
  weight: "bolder",
  size: "medium",
};

const AUTHOR_ITEM_TEMPLATE = {
  type: "ColumnSet",
  columns: [
    {
      type: "Column",
      width: "auto",
      items: [
        {
          type: "Image",
          url: "URL_HERE",
          size: "small",
          style: "person",
        },
      ],
    },
    {
      type: "Column",
      width: "stretch",
      items: [
        {
          type: "TextBlock",
          text: "AUTHOR_HERE",
          weight: "bolder",
          wrap: true,
        },
        {
          type: "TextBlock",
          spacing: "none",
          text: "SUB_TEXT_HERE",
          isSubtle: true,
          wrap: true,
        },
      ],
    },
  ],
};

const DESCRIPTION_ITEM_TEMPLATE = {
  type: "TextBlock",
  text: "DESCRIPTION_HERE",
  wrap: true,
};

const LIST_ITEM_TEMPLATE = {
  type: "FactSet",
  facts: [],
};

const LINK_ITEM_TEMPLATE = {
  type: "ColumnSet",
  columns: [
    {
      type: "Column",
      width: "auto",
      items: [
        {
          type: "Image",
          altText: "",
          url: "https://developer.webex.com/images/link-icon.png",
          size: "Small",
          width: "30px",
        },
      ],
      spacing: "Small",
    },
    {
      type: "Column",
      width: "auto",
      items: [
        {
          type: "TextBlock",
          text: "[DESCRIPTION_HERE](URL_HERE)",
          horizontalAlignment: "Left",
          size: "Medium",
        },
      ],
      verticalContentAlignment: "Center",
      horizontalAlignment: "Left",
      spacing: "Small",
    },
  ],
};

const BUTTON_URL_TEMPLATE = {
  type: "Action.OpenUrl",
  title: "BUTTON_TITLE_HERE",
  url: "BUTTON_URL_HERE",
};

const FOOTER_TEMPLATE = {
  type: "TextBlock",
  text: "FOOTER_TEXT_HERE",
  wrap: true,
  size: "small",
  $part: "footer",
};

/**
 * @typedef {Object} KeyValue
 * @property {string} key
 * @property {string} value
 */
