/*eslint-env node*/
import express from 'express';

import {createToken, readToken, isAuth} from '../../libs/auth';
import {ensurePostData} from '../../libs/utils';

module.exports = function TokenModule() {
	// Attach the CRUD endpoint
	let app = express.Router();
	
	app.get('/', isAuth);
	app.post('/', ensurePostData('email', 'password'), createToken);
	
	return app;
};

