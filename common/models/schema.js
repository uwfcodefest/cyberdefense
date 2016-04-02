/**
 * The Schema class provides an interface to validate the data of a model
 */

/*eslint-env node browser*/
'use strict';

import _ from 'lodash';
import _validate from '../validate';

export default class Schema {
	constructor(data = {}) {
		this.data = data;
	}

	constraints = {};
	blacklist = [];

	static validate(data, ops) {
		return _validate(data, this.constraints || Object.getPrototypeOf(this).constraints, ops)
	}

	validate(ops = {}) {
		return Object.getPrototypeOf(this).validate(this.data, ops)
	}

	static toJSON(data) {
		return _.omit(data, this.blacklist)
	}

	toJSON() {
		return Schema.toJSON(this.data, this.blacklist)
	}
}
