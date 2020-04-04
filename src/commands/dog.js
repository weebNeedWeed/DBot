const fetch = require("node-fetch");

const { MessageAttachment } = require("discord.js");

// @params message: message object provide by user send message event
const dog = async function (message) {
	try {
		let fetching = await fetch(
			"https://dog.ceo/api/breeds/image/random",
		).catch(() => message.channel.send("Error while fetching data"));
		let data = await fetching.json();
		if (data.status !== "success") throw new Error("Cannot fetch api");
		let attachment = new MessageAttachment(data.message);
		message.channel.send(attachment);
	} catch (err) {
		console.log(err);
		message.channel.send("Error while fetching data");
	}
};

module.exports = dog;
