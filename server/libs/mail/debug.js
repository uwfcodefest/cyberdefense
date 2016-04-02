var config = require('../../config');

module.exports = function (Message) {

	return function DebugMessage(ops) {
		ops = ops || {};
		_.defaults(ops, {
			to: config.mail.debug.email,
			subject: 'Debug - CyberDefense',
			from_email: 'cyberdefense@bavellone.me',
			from_name: 'CyberDefense'
		});

		return new Message(ops);
	}
};
