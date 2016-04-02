/*eslint-env node*/
'use strict';

import q from 'q';

import DB from '../db';
import User from '../api/user/model';
import {sign, verify} from './jwt';
import {AuthDenied, ValidationError, wrap} from './errors';


/**
 * Reads token from incoming requests and saves it to req.token
 */
export function readToken(req, res, next) {
	if (req.cookies.token)
		verify(req.cookies.token)
			.done(token => {
				req.token = token;
				next();
			}, () => next(new ValidationError('Invalid Token!')));
	else 
		next();
}

/**
 * Throws an error if req.token is not set
 */
export function requireToken(req, res, next) {
	if (!req.token)
		next(new AuthDenied('Auth token is required'));
	else 
		next();
}

/**
 * Reads and verifies req.token
 */
export function isAuth(req, res, next) {
	if (req.token)
		res.status(200).end();
	else 
		res.status(401).end();
}

/**
 * Creates a new token
 */
export function createToken(req, res, next) {
	req.db.query('MATCH (user:User {email: {email}}) return user', {email: req.body.email}, (err, data) => {
		if (err)
			return next(wrap(err));

		let user = new User(data[0] || {});

		user.authenticate(req.body.password)
			.done(
				() => res.json({token: sign({roles: user.data.roles || ['user']})}),
				() => next(new AuthDenied('Invalid Email/Password'))
			)
	});
}
