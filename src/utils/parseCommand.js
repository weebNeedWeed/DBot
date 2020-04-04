// the function return arguments from parsed command returned by parseMessage
const parseCommand = (command) => {
	const stringArray = command.split(" ");
	return {
		command: stringArray[0],
		arguments: stringArray.slice(1),
	};
};

module.exports = parseCommand;
