const { MessageEmbed } = require("discord.js");

const apiKey = require("./../models/apikey");

const fetch = require("node-fetch");

const test = async function (message) {
	message.channel.send("Thank for using");
	message.channel.send("Data is now fetching");

	const guildId = message.guild.id;

	const guildData = await apiKey.findOne({ guild_id: guildId });

	try {
		if (!guildData) {
			throw new Error("Api key not found");
		}

		let url = `https://minecraftpocket-servers.com/api/?object=servers&element=detail&key={key}`;
		url = url.replace("{key}", guildData.key);

		const response = await fetch(url);
		const cloneResponse = await response.clone();

		if ((await cloneResponse.text()) === "Error: server key not found") {
			throw new Error("The API key has not been configured yet");
		}

		const data = await response.json();

		const dataFilters = [
			"address",
			"port",
			"is_online",
			"players",
			"maxplayers",
			"version",
			"votes",
		];

		const fieldsArray = dataFilters.map((field) => {
			let fieldData = {
				name: field.toUpperCase(),
				value: data[field],
			};
			return fieldData;
		});

		const messageWillSend = new MessageEmbed();

		messageWillSend.setColor("RANDOM");

		messageWillSend.setTitle(data.name);

		messageWillSend.addFields(fieldsArray);

		messageWillSend.setURL(data.url);

		messageWillSend.setAuthor("vote now!".toUpperCase(), "", data.url + "vote");

		message.channel.send(messageWillSend);
	} catch (error) {
		console.log(error);
		message.channel.send("Error while fetching data");
		return;
	}
};

module.exports = test;
