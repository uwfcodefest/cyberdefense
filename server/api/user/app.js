/*eslint-env node*/
import DB from '../../db';
import User from './model';

module.exports = function UserModule() {
	// Return the CRUD endpoint
	return DB.CRUDEndpoint(User);
};
