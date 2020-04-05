const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const path = require("path");

dotenv.config({
	path: path.join(__dirname, "/./../environments/.env.server"),
});
dotenv.config({
	path: path.join(__dirname, "/./../environments/.env.database"),
});

var start = null;

const connectWithRetry = () => {
	let uri = process.env.DATABASE_URI;
	uri = uri.replace("<username>", process.env.DATABASE_USERNAME);
	uri = uri.replace("<password>", process.env.DATABASE_PASSWORD);
	mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
	var db = mongoose.connection;
	db.on("error", (err) => {
		setTimeout(connectWithRetry, 5000);
		console.log("auto connect after 5s");
	});
	db.once("open", function () {
		console.log("connect to db success");
	});
};
connectWithRetry();
app.use("/", (req, res) => {
	if (!start) {
		start = require("./index");
		start();
	}

	res.send("bot is running");
});
const defaultPort = 80;
app.listen(process.env.PORT || defaultPort);
