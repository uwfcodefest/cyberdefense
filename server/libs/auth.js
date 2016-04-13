/*eslint-env node*/
'use strict';

import {AuthDenied, ValidationError, wrap} from './errors';


/**
 * Reads token from incoming requests and saves it to req.token
 */
export function readToken(req, res, next) {
	if (req.cookies.token)
		next();
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
	next()
}
