/*eslint-env node*/
'use strict';

import q from 'q';
import bcrypt from 'bcryptjs';

import UserSchema from '../../../common/models/user';

let config = require('../../config');

export default class User extends UserSchema {
	static validationSettings = {
		create: {
			hashPass: true
		}
	};

	static blacklist = ['password'];

	static validate = (data, ops = {hashPass: false}) => {
		const err = UserSchema.validate(data, ops);

		if (err)
			return q.reject(err);

		if (!ops.hashPass)
			return q.resolve(data);

		// generate a salt
		return q.Promise((resolve, reject) => {
			bcrypt.genSalt(config.auth.saltWorkFactor, (err, salt) => {
				if (err) return reject(err);

				// hash the password using our new salt
				bcrypt.hash(data.password, salt, (err, hash) => {
					if (err) return reject(err);

					// override the cleartext password with the hashed one
					return resolve({
						...data,
						password: hash
					});
				})
			})
		})
	};

	static authenticate = (password, hash) =>
		q.promise((resolve, reject) => {
			bcrypt.compare(password, hash, function (err, auth) {
				if (err || !auth) return reject(err);
				return resolve(auth);
			});
		});

	// static login = (email, pass) =>
	// 	DB.query(getUserByEmailCQL, {email}).then(data => {
	// 		const user = (data.length ? data[0] : {})
	// 		return User.authenticate(pass || '', user.password).then(() => {
	// 			return user;
	// 		})
	// 	})
}
