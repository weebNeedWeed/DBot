const mongoose = require("mongoose");

const apikey = mongoose.Schema({
	guild_id: String,
	key: String,
});

const apikeyModel = mongoose.model("apikey", apikey);

module.exports = apikeyModel;
