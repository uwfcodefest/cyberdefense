
var utils = require('../libs/utils'),
	mail = require('./mail');


describe('Utils', function () {
	describe('GlobMap', function () {
		it('should return a list of files in the test directory', function () {

			var paths = utils.globMap('./server/test/*.js', function (paths) {
				expect(paths).to.exist;
				return paths;
			});
			expect(paths).to.exist;

			_.map(paths, function (data) {
				expect(data).to.exist;
			});
		});
	});
});


describe.skip('Mail', function() {
	describe('Transactional', function() {
		describe('Debug', function() {
			it('should send a Debug email', function(done) {
				mail.transactional.debug({
					html: '<h1>This is a test</h1><p>Rawr</p>'
				}).send(function() {
					done(null);
				});
			})
		})
	})
});
