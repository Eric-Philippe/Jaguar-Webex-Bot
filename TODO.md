# TODO List - Jaguar Webex Bot

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
  - [Common Box Features](#common-box-features)
- [Documentation](#documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Life Cycle](#project-life-cycle)
- [References and Links](#references-and-links)

## Architecture

- [x] Create the project
- [x] Import the main dependencies
- [x] Implement the static (`.env`) configuration
- [x] Implement the dynamic (`config.json` / `CustomConfig.js`) configuration
- [x] Implement the SQLite database
- [x] Implement the events listener handler
- [x] Implement a proper command handler
- [x] Implement the Logger feature
- [x] Fill the Types.js file with the necessary types for easier development and maintenance
- [x] Implement an EmbedBuilder class from the Card Json structure from the Webex API

## Features

- [x] Implement the `Ping` command for testing purposes
- [x] Implement the `Hi` command for learning more about the basic message answering
- [x] Implement the `Info` command to learning more about Cards from the Webex API
- [x] Implement the `Help` command to show the available commands

### Common Box Features

> Life cycle for the Common Box feature

- [x] Implement the `AddToBox` command to add a new user able to interact with the box
- [x] Implement the `RemoveFromBox` command to remove a user from the box -> TO BE TESTED
- [x] Implement the `Box` command to show the current user to interact with the box -> TO BE TESTED
- [x] Implement the `BoxList` command to show all the users able to interact with the box
- [ ] Implement the `Next` command to set the next user able to interact with the box
- [ ] Implement the `Previous` command to set the previous user able to interact with the box
- [x] Implement the `Assign` command to assign a specific user to interact with the box
- [ ] Implement the `ChangeTime` command to change the time of the announcement of the box
- [ ] Implement the `ChangeDirection` command to change the direction of the distribution of the box (chance the ASC/DESC in the dynamic configuration)
- [ ] Implement the Announcement feature to announce the next user able to interact with the box every working day at a specific time

## Documentation

- [x] Create the README.md file
- [ ] Write the README.md file with the necessary information
- [ ] Add an installation guide
- [ ] Comment all the code

## Testing

- [ ] Determine the testing strategy

## Deployment

- [x] Implement the Docker Compose file
- [ ] Add CI/CD pipeline for testing and deployment

## Project Life Cycle

- [x] Comment all the code 1
- [x] Clean the code 1
- [ ] Comment all the code 2
- [ ] Clean the code 2

## References and Links

- [Webex API Documentation](https://developer.webex.com/docs/creating-a-chatbot-with-the-node-bot-framework)
- [Webex Framework Documentation](https://github.com/WebexCommunity/webex-node-bot-framework?tab=readme-ov-file#event_mentioned)
- [Discord Embeds Documentation](https://discordjs.guide/popular-topics/embeds.html#embed-preview) - For my own EmbedBuilder implementation for the Webex API
- [Regex101](https://regex101.com/)
- [Emojipedia](https://emojipedia.org)