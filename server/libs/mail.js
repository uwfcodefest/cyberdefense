var _ = require('lodash'),
	mandrill = require('mandrill-api/mandrill'),
	utils = require('./utils'),
	errors = require('./errors'),
	config = require('../config');

var mailClient = new mandrill.Mandrill(config.mail.apiKey);

function Message(ops) {
	ops = ops || {};
	_.defaults(ops, {
		html: '',
		to: [],
		subject: '',
		from_email: '',
		from_name: ''
	});
	_.merge(this, ops);
	var self = this;

	this.setHtml = function(html) {
		self.html = html;
		return self;
	};
	this.addRecipient = function(recipient) {
		self.to.push(recipient);
		return self;
	};
	this.send = function(success, err) {
		mailClient.messages.send({
			message: self,
			async: true
		}, success, err);
	};

	return this;
}


module.exports = utils.globReduce('./server/libs/mail/**/*.js', function(map, paths) {
	map[paths.file] = require(paths.full)(Message);
	return map;
});
