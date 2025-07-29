# 🐆 Jaguar - Webex Bot

This is a [Webex](https://developer.webex.com) [Node.JS](https://nodejs.org) bot application that serves my work team as a way to manage the common mailbox turn mainly. It features the [webex-node-bot-framework](https://github.com/webex/webex-bot-node-framework) that simplifies development for Webex bots by abstracting away some of the complexity of the API calls and registering for events. The naked project is from the [Webex Starter Bot](https://github.com/WebexSamples/webex-bot-starter) template created by "jpjpjp".

## ⚙️ Table of Contents

- [🐆 Jaguar - Webex Bot](#-jaguar---webex-bot)
  - [⚙️ Table of Contents](#️-table-of-contents)
  - [📚 Features](#-features)
  - [📱 Technologies](#-technologies)
  - [🔗 Architecture](#-architecture)
    - [🤝 Handlers](#-handlers)
      - [Events Listener Handler](#events-listener-handler)
      - [Command Handler and Command Groups](#command-handler-and-command-groups)
      - [CronScript Handler](#cronscript-handler)
    - [API Integration](#api-integration)
      - [EmbedBuilder](#embedbuilder)
      - [ActionListener](#actionlistener)
    - [💾 Database](#-database)
      - [User schema](#user-schema)
    - [📜 Logger](#-logger)
    - [✉️ Messages](#️-messages)
  - [🖥️ Installation](#️-installation)
    - [🔌 Prerequisites](#-prerequisites)
    - [🐋 Docker](#-docker)
    - [💡 Steps to get the bot working](#-steps-to-get-the-bot-working)

## 📚 Features

The whole list of features can be found in the [TODO.md](TODO.md) file.
Below is a list of the main features:

- **Common Box Features**
  - Add a user to the box
  - Remove a user from the box
  - Show the current user in the box
  - Show all the users in the box
  - Set the next user in the box
  - Set the previous user in the box
  - Assign a specific user to the box
  - Show the user in the box today
  - Change the time of the announcement of the box
  - Change the direction of the distribution of the box
  - Announce the next user in the box every working day at a specific time (excluding bank holidays)

## Quick run

The whole app is dockerized, so you can easily run the bot with the following command:

```bash
docker run --name jaguar-webex-bot-container --env-file .env ghcr.io/eric-philippe/jaguar-webex-bot:latest-amd64
```

## 📱 Technologies

| Tech       | Version |
| ---------- | ------- |
| Node       | 21.7.1  |
| Webex      | 2.3.14  |
| PostgreSQL | 8.11.3  |

## 🔗 Architecture

The bot was built with the goal of being as customizable as possible.

### 🤝 Handlers

- **Handlers** - Events listener handler - Command handler - CronScript handler

This means that you can easily add new commands, events, scripts, command groups without having to change the core of the bot. It makes maintaining the bot easier and faster.

#### Events Listener Handler

The events listener handler is responsible for listening to the events that the bot receives from the Webex API. It is the first step in the bot's architecture and is responsible for receiving the events and passing them to the command handler. You can decide on the `events/Events.js` file which events you want to listen to.

#### Command Handler and Command Groups

The command handler is responsible for handling the commands that the bot receives from the Webex API. It is the second step in the bot's architecture and is responsible for receiving the commands and passing them to the correct command group. You can decide on the `commands/Commands.js` file which commands you want to add to the bot. For example, in my development, I have a command named `Test` that I can easily add and remove from the bot's commands.

#### CronScript Handler

The cron script handler is responsible for handling the scripts that the bot has to run at a specific time. Even more it is responsible for handling the changes that may occur to the scripts considering that the user can customize the scripts while the bot is running. As for the commands, you can decide on the `scripts/Scripts.js` file which scripts you want to add to the bot.

### API Integration

I allowed myself to write helper classes to make the integration with the Webex API easier. The classes are:

#### EmbedBuilder

Based on my knowledge of the Discord EmbedBuilder implementation, I created a class that allows me to create cards for the Webex API more easily. The class is in the `utils/EmbedBuilder.js` file.

#### ActionListener

I created a Message Action listener that allows to listen to the actions from a single message, allowing to setup a custom maximum time to listen to the actions, a custom timeout message, callback...

### 💾 Database

The bot uses PostgreSQL database to store the data. The database connection is configured in `.env` file for `Database.js` and serves the table `users` through the `services/UserServices.js` class.

**Database Configuration:**

- Database: jaguar

#### User schema

The user schema is as follows:

```sql
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    pointed BOOLEAN NOT NULL DEFAULT FALSE,
    is_absent BOOLEAN NOT NULL DEFAULT FALSE
);
```

### 📜 Logger

The logger is a simple logger that logs the miscellaneous information in `Logs/Logs.log` and the caught errors in `Logs/Errors.log`. The logger is in the `utils/Logger.js` file.

### ✉️ Messages

I implemented a simple Message sender to centralize the sending of messages between the error ones, the informations ones and the success ones. It also allows to catch any error that may occur while sending a message. The message sender is in the `utils/MessageSender.js` file.

## 🖥️ Installation

### 🔌 Prerequisites

- [ ] node.js (minimum supported v8.0.0 & npm 2.14.12 and up)

- [ ] [Sign up for Webex Developer Account](https://developer.webex.com/signup)

### 🐋 Docker

The whole project is dockerized, so you can easily run the bot with the following command:

```bash
docker-compose up
```

### 💡 Steps to get the bot working

1. Create a Webex bot (save the API access token and username): <https://developer.webex.com/my-apps/new/bot>

2. Sign up for nGrok, then connect and start it on your machine (save the port number and public web address): <https://ngrok.com/download>

3. After installing ngrok, run it on your local machine to get a public ip address, eg `ngrok http 3000 --region=eu` or `ngrok http --domain=<your_domain> 3000`

4. Copy the ip address displayed in the ngrok window, ie: : <https://1234.eu.ngrok.io>

5. Copy the `.env.local` file to a file called `.env`

6. Edit `.env` with the following values:

   - BOTTOKEN - Set this to the token for your bot that you got in step 1
   - PORT - Set this to the port you set when you started ngrok in step 3 (ie: 3000)
   - WEBHOOKURL - Set this to the ip address that you copied in step 4
   - MAIN_GROUPID - Set this to the group id of the space where you want the bot to work

7. Turn on your bot server with `npm start`

8. Create a space in Webex

9. Add the bot (by its email) to the space in Webex
