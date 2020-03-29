// load bot config file
const botRun = () => {
	require("dotenv").config({ path: "./environments/.env.bot" });

	const Discord = require("discord.js");
	const fetch = require("node-fetch");

	const { Client, MessageAttachment } = Discord;

	// get config data
	const TOKEN = process.env.TOKEN;
	const COMMAND_PREFIX = process.env.COMMAND_PREFIX;

	// create new bot object
	const bot = new Client();

	// login to discord
	bot.login(TOKEN);

	// ready event
	bot.on("ready", function() {
		console.log(`hello i'm ${bot.user.tag}`);
	});

	const parseMessageFromRaw = (message, prefix) => {
		let matchPattern = new RegExp(`^${prefix + ".+"}$`, "g");
		if (message.match(matchPattern)) {
			let replacePattern = new RegExp(prefix);
			let parsedMessage = message.replace(replacePattern, "");
			return parsedMessage;
		}
		return "";
	};

	bot.on("message", function(message) {
		let parsed = parseMessageFromRaw(message.content, COMMAND_PREFIX);
		switch (parsed) {
			case "dog":
				(async function() {
					try {
						let fetching = await fetch(
							"https://dog.ceo/api/breeds/image/random"
						);
						let data = await fetching.json();
						if (data.status !== "success")
							throw new Error("Cannot fetch api");
						let attachment = new MessageAttachment(data.message);
						message.channel.send(attachment);
					} catch (err) {
						console.log(err);
						message.channel.send("Error while fetching data");
					}
				})();
				break;
		}
	});
};

module.exports = botRun;
