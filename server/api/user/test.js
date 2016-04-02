/*eslint-env node*/

describe('User', () => {
	describe('API', () => {
		let user = {};
		
		before(function (done) {
			global.request.delete(global.app.locals.api.user + '/')
				.expect(200)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});
		
		it('should create a user', (done) => {
			global.request.post(global.app.locals.api.user + '/')
				.send({email: global.utils.getUID('user') + '@email.com', password: '123'})
				.expect(200)
				.expect('Content-type', /json/)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					user = res.body;
					done(err);
				});
		});

		it('should list users', (done) => {
			global.request.get(global.app.locals.api.user + '/')
				.expect(200)
				.expect('Content-type', /json/)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});
		
		it('should reject an invalid email when trying to create a user', (done) => {
			global.request.post(global.app.locals.api.user + '/')
				.send({email: global.utils.getUID('user') + '@email', password:'1'})
				.expect(400)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});

		it('should not return the user\'s password field', (done) => {
			global.request.post(global.app.locals.api.user + '/')
				.send({email: global.utils.getUID('user') + '@email.com', password: '123'})
				.expect(200)
				.expect(res => {
					expect(res.body.password).to.not.exist;
				})
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});
		
		it('should retrieve a user', (done) => {
			global.request.get(global.app.locals.api.user + '/' + user.id)
				.expect(200)
				.expect('Content-type', /json/)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});
		
		it('should update a user', (done) => {
			global.request.put(global.app.locals.api.user + '/' + user.id)
				.send({email: global.utils.getUID('user') + '@email.com'})
				.expect(200)
				.expect(res => {
					expect(res.body.email).to.not.equal(user.email)
				})
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});

		it('should return an error when sending invalid ID', (done) => {
			global.request.get(global.app.locals.api.user + '/' + 'null')
				.expect(400)
				.expect('Content-type', /json/)
				.end((err, res) => {
					if (err)
						console.error(res.body);
					done(err);
				});
		});
		
	})
});
