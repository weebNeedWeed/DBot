const parseMessage = (message, prefix) => {
	let matchPattern = new RegExp(`^${prefix + ".+"}$`, "g");
	if (message.match(matchPattern)) {
		let replacePattern = new RegExp(prefix);
		let parsedMessage = message.replace(replacePattern, "");
		return parsedMessage;
	}
	return "";
};
module.exports = parseMessage;
