const apikey = require("./../models/apikey");

const config = async (message, argument) => {
	const key = argument[0];
	const guildId = message.guild.id;
	if (!key) {
		message.channel.send("missing arguments");
		return;
	}
	if (!guildId) {
		message.channel.send("missing access permission");
		return;
	}
	const existedKey = await apikey.findOne({ guild_id: guildId });
	if (!existedKey) {
		let newKey = new apikey({
			guild_id: guildId,
			key,
		});
		await newKey.save();
	} else await apikey.updateOne({ guild_id: guildId }, { key });

	message.channel.send("successfully update your api key");
};

module.exports = config;
