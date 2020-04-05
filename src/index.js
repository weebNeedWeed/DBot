// load bot config file
const botRun = () => {
	require("dotenv").config({ path: "./environments/.env.bot" });

	const parseMessage = require("./utils/parseMessage");
	const parseCommand = require("./utils/parseCommand");

	const Discord = require("discord.js");

	const { Client } = Discord;

	// get config data
	const TOKEN = process.env.TOKEN;
	const COMMAND_PREFIX = process.env.COMMAND_PREFIX;

	// create new bot object
	const bot = new Client();

	// login to discord
	bot.login(TOKEN);

	// ready event
	bot.on("ready", function () {
		console.log(`hello i'm ${bot.user.tag}`);
	});

	const getCommand = function (commandName) {
		try {
			let command = require(`./commands/${commandName}`);
			return command;
		} catch (err) {
			return () => console.log(err);
		}
	};

	bot.on("message", function (message) {
		let parsedMessage = parseMessage(message.content, COMMAND_PREFIX);
		const parsedCommand = parseCommand(parsedMessage);
		switch (parsedCommand.command) {
			case "dog":
				getCommand("dog")(message);
				break;
			case "config":
				getCommand("config")(message, parsedCommand.arguments);
				break;
			case "test":
				getCommand("test")(message, parsedCommand.arguments);
				break;
		}
	});
};

module.exports = botRun;
