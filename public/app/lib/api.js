import _ from 'lodash';
import $ from 'jquery';
import q from 'q';

// Define the API object
let API = {},
	config = {
		version: '1',
		path: '/api'
	};

/**
 * The API_Endpoint acts as a wrapper around a remote endpoint. It returns
 * observable streams from all of it's methods.
 * @class API_Endpoint
 */
export class API_Endpoint {
	static token;
	constructor(uri, routes) {
		this.uri = uri;
		this.routes = routes;
		// Attach a handle for each route
		_.map(routes, (route, key) => {
			this[key] = (data = {}) => {
			return API_Endpoint[route.method || 'GET']({
				url: `${config.path}/${this.uri}${route.uri ? '/' + route.uri : ''}${data.id ? '/' + data.id : ''}`,
				data
			})
		}
	})
	}

	static request(args) {
		return q($.ajax({
				...args,
			xhrFields: {
			withCredentials: true
		}
	})).catch(err => {
			throw err.responseJSON
		})
	}
	static GET(args) {
		return API_Endpoint.request({
				...args,
			method: 'GET'
	})
	}

	static POST(args) {
		return API_Endpoint.request({
				...args,
			method: 'POST',
			data: JSON.stringify(args.data || {}),
			contentType: 'application/json'
	})
	}

	static PUT(args) {
		return API_Endpoint.request({
				...args,
			method: 'PUT',
			contentType: 'application/json'
	})
	}

	static DELETE(args) {
		return API_Endpoint.request({
				...args,
			method: 'DELETE'
	})
	}
}

/**
 * Endpoint definitions
 */

API.user = new API_Endpoint('user', {
	create: {
		method: 'POST'
	},
	read: {
		method: 'GET'
	}
});

export default API;
