const express = require("express");

const app = express();

var start = null;

app.use("/", (req, res) => {
	if (!start) {
		start = require("./index");
		start();
	}

	res.send("bot is running");
});

app.listen(80);
