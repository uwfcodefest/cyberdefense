/*eslint-env node browser*/
'use strict';

import Schema from './schema';


export default class UserSchema extends Schema {
	constructor(data) {
		super(data)
	}

	static type = 'User';
	constraints = {
		email: {
			presence: true,
			email: {
				message: 'looks invalid'
			}
		},
		password: {
			presence: true,
			length: {
				minimum: 3
			}
		},
		roles: {
			inclusion: ['user', 'admin']
		}
	};
}
