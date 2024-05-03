/**
 * Type definitions for the Webex Bot Framework
 * based on : https://github.com/WebexCommunity/webex-node-bot-framework?tab=readme-ov-file
 */

/**
 * @typedef {Object} MentionnedPeople
 * @property {string} id - The id of the person
 */

/**
 * @typedef {Object} Message
 * @property {string} id - The id of the message
 * @property {string} roomId - The id of the room
 * @property {'direct'|'group'|'team'} roomType - The type of the room
 * @property {string} text - The text of the message
 * @property {string} personId - The id of the person
 * @property {string} personEmail - The email of the person
 * @property {MentionnedPeople[]} mentionedPeople - The people mentioned in the message
 */

/**
 * @typedef {Object} Person
 * @property {string} id - The id of the person
 * @property {string[]} emails - The emails of the person
 * @property {string} displayName - The display name of the person
 * @property {string} nickName - The nickname of the person
 * @property {string} firstName - The first name of the person
 * @property {string} lastName - The last name of the person
 * @property {string} userName - The username of the person (here the mail because why not)
 * @property {string} avatar - The avatar of the person
 * @property {string} orgId - The id of the organization
 * @property {Date} created - The date of creation of the person
 * @property {Date} lastModified - The date of the last modification of the person
 * @property {'person'|'bot'} type - The type of the person
 * @property {string} title - The title of the person
 * @property {string} manager - The manager of the person (LastName, FirstName)
 * @property {string} managerId - The id of the manager
 */

/**
 * @typedef {Object} Trigger
 * @property {'message'|'command'} type - The type of the trigger
 * @property {string} id - The id of the trigger
 * @property {string} text - The plain text of the trigger
 * @property {string[]} args - The arguments of the trigger
 * @property {Message} message - The message of the trigger
 * @property {Person} person - The person of the trigger
 */

/**
 * @typedef {Object} Room
 * @property {string} id - The id of the room
 * @property {string} title - The title of the room
 * @property {'group'} type - The type of the room
 * @property {boolean} isLocked - If the room is locked
 * @property {Date} lastActivity - The date of the last activity of the room
 * @property {string} creatorId - The id of the creator of the room
 * @property {Date} created - The date of the creation of the room
 * @property {string} ownerId - The id of the owner of the room
 * @property {boolean} isPublic - If the room is public
 * @property {boolean} isReadOnly - If the room is read only
 */

/**
 * @typedef {Object} Options
 * @property {string} webhookUrl - The url of the webhook
 * @property {string} token - The token of the bot
 * @property {string} port - The port of the bot
 * @property {boolean} debug - If the bot is in debug mode
 * @property {boolean} dev - If the bot is in dev mode
 */

/**
 * @typedef {Object} Bot
 * @property {string} id - The id of the bot
 * @property {Person} person - The person of the bot
 * @property {Room} room - The room of the bot
 * @property {Options} options - The options of the bot
 * @property {boolean} isBotAccount - If the bot is a bot account
 * @property {boolean} isUserAccount - If the bot is a user account
 * @property {string} email - The email of the bot
 * @property {boolean} isLocked - If the bot is locked
 * @property {boolean} isModerator - If the bot is a moderator
 * @property {boolean} isGroup - If the bot trigger is in a group
 * @property {boolean} isDirect - If the bot trigger is direct
 * @property {boolean} isTeam - If the bot trigger is in a team
 * @property {Date} lastActivity - The date of the last activity of the bot
 * @property {string} apiUrl - The url of the api
 * @property {number} _eventsCount - The number of events (For debug purposes only)
 * @property {Function} say - The function to send a message ("markdown"|"text", "message)
 * @property {Function} sayWithLocalFile - The function to send a message with a local file ("message", "path")
 * @property {Function} reply - The function to reply to a message reply(trigger.message, message)
 * @property {Function} dm - The function to send a direct message (person.id, "message")
 * @property {Function} sendCard - The function to send a card (cardJson, "fallback")
 * @property {Function} dmCard - The function to send a card in dm (cardJson, "fallback")
 * @property {Function} censor - Remove the bot mention from the message (messageid)
 * @property {Function} roomRename - Rename the room (title)
 */
