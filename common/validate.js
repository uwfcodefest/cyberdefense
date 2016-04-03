/*eslint-env browser,node*/
'use strict';

import validate from 'validate.js';
import moment from 'moment';
import _ from 'lodash';

validate.validators.date = function (value, options) {
	if (options.match)
		if (!options.match.test(value))
			return 'is formatted incorrectly';
	if (options.min)
		if (moment(value, options.format).isBefore(moment(options.min, options.format)))
			return `can't be before ${options}`;
	if (options.max)
		if (moment(value, options.format).isAfter(moment(options.max, options.format)))
			return `can't be after ${options}`
};

validate.validators.arrayLen = function (value, options) {
	if (options.min && options.min > value.length)
		return options.message || 'isn\'t long enough';
	if (options.max && options.max < value.length)
		return options.message || 'is too long'
	if (options.type) 
		return _.find(value, item => {
			if (!(item.constructor === options.type)
			 && !(item instanceof options.type))
				return 'must be of type: ' + options.type.name
		});
};

validate.validators.arrayInclusion = function (value, options) {
	if (!_.every(value, val => _.includes(options, val)))
		return `must be one of: ${options.join(', ')}`
}

validate.validators.type = function (value, type) {
	if (!(value.constructor === type) && !(value instanceof type))
		return 'must be of type: ' + type.name
};

validate.validators.model = function (value, options) {
	if (options.schema.validate(value))
		return options.message || 'must be a valid ' + options.schema.type
};

validate.validators.models = function (value, options) {
	if (!_.every(value, model => 
		options.schema.validate(model) === undefined
	)) 
		return options.message || 'must contain valid ' + options.schema.type
};

export default validate;
