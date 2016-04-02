/*eslint-env node*/
'use strict';

import q from 'q';
import bcrypt from 'bcrypt';

import DB from '../../db';
import UserSchema from '../../../common/models/user';

let config = require('../../config');

class User extends UserSchema {
	constructor(data) {	super(data)	}
	
	static validationSettings = {
		create: {
			hashPass: true
		}
	};

	static blacklist = ['password'];
	
	validate(ops = {hashPass: false}) {
		return super.validate(ops)
			.then((data) => { // Hash password
				if (!ops.hashPass)
					return data;
				
				// generate a salt
				return q.Promise((resolve, reject) => {
					bcrypt.genSalt(config.auth.saltWorkFactor, (err, salt) => {
						if (err) return reject(err);

						// hash the password using our new salt
						bcrypt.hash(this.data.password, salt, (err, hash) => {
							if (err) return reject(err);

							// override the cleartext password with the hashed one
							this.data.password = hash;
							return resolve(this.data);
						})
					})
				})
			})
	}
	
	authenticate = (password) =>
		q.promise((resolve, reject) => {
			bcrypt.compare(password, this.data.password || '', function (err, auth) {
				if (err || !auth) return reject(err);
				return resolve(auth);
			});
		});
	
}

export default DB.registerSchema(User, 'User');
