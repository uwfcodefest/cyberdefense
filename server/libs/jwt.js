/*eslint-env node*/
import fs from 'fs';
import jwt from 'jsonwebtoken';
import q from 'q';
import config from '../config';

const pub = fs.readFileSync(config.auth.jwt.publicKey);
const key = fs.readFileSync(config.auth.jwt.secretKey);

export function sign(data, ops = {}) {
	return q.Promise((resolve) => {
		jwt.sign(data, key, {algorithm: 'RS256', ...ops}, resolve)
	});
}

export function verify(token) {
	return q.Promise((resolve, reject) => {
		jwt.verify(token, pub, {algorithm: 'RS256'}, (err, data) => {
			if (err) return reject(err);
			else resolve(data);
		})
	});
}
