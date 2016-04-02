/*eslint-env node*/
var debug = require('debug')('app:testing'),
	config = require('../server/config');

module.exports.responseSuccess = function (res) {
	return JSON.parse(res.text).success;
};

module.exports.responses = {
	success: function (res) {
		expect(JSON.parse(res.text).success).to.be.ok;
	},
	hasContent: function (res) {
		expect(JSON.parse(res.text)).to.not.be.empty;
	}
};

module.exports.getUID = function (base) {
	function rand() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
	}

	return base + '-' + rand();
};


global.utils = module.exports;
