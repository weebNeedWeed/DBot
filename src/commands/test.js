const { MessageEmbed } = require("discord.js");

const test = function (message) {
	let newMes = new MessageEmbed({ title: "sdasda" });
	newMes.setColor("RANDOM");
	newMes.addField("a", "b");
	newMes.setDescription("sdadas");
	message.channel.send(newMes);
};
module.exports = test;
