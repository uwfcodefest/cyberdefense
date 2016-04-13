/*eslint-env node*/
var uuid = require('node-uuid');

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
	return base + '-' + uuid.v4();
};

global.utils = module.exports;
