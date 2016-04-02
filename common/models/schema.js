/**
 * The Schema class provides an interface to validate the data of a model
 */

/*eslint-env node browser*/
'use strict';

import q from 'q';
import _ from 'lodash';
import _validate from 'validate.js';

export default class Schema {
	constructor(data = {}) {
		this.data = data;
	}

	constraints = {};
	blacklist = [];

	validate(ops = {}) {
		let err;

		if (err = _validate(this.data, this.constraints, ops))
			return q.reject(err);
		else
			return q.resolve(this.data);
	}

	static toJSON(data, blacklist) {
		return _.omit(data, blacklist)
	}

	toJSON() {
		return Schema.toJSON(this.data, this.blacklist)
	}
}
