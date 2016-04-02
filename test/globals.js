/*eslint-env node*/
process.env.NODE_ENV = 'testing';

var chai = require('chai'),
	_ = require('lodash'),
	async = require('async'),
	debug = require('debug');

global.chai = chai;
global.expect = chai.expect;
global.app = require('../server/app')();
global.request = require('supertest').agent(global.app);
global._ = _;
global.glob = require('glob');
global.path = require('path');
global.async = async;
global.config = require('../server/config');
global.debug = debug;

// Make sure app is initialized before running any tests
before(::global.app.ready.then);
