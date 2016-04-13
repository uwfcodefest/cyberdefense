/*eslint-env browser */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import semantic from 'semantic';
import {match, browserHistory, Router} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import Routes from './routes';
import reducers from './reducers/index';
import * as middleware from './middleware';

const store = createStore(
	reducers,
	applyMiddleware(middleware.logger, middleware.crashReporter)
);

route();

browserHistory.listen((loc) => {
	// window.ga('send', 'pageview', loc.pathname);
});

function render(props) {
	ReactDOM.render(
		<Provider store={store}>
			<Router {...props}/>
		</Provider>
		, document.querySelector('body'));
}

function route() {
	match({history: browserHistory, routes: Routes}, (err, redirectLocation, renderProps) => {
		if (redirectLocation) {
			console.log(`Redirecting to ${redirectLocation.pathname}`);
			browserHistory.replace(redirectLocation);
			route();
		}
		else if (err || !renderProps) {
			console.log(`Route Not Found`);
			browserHistory.push('/');
			route();
		}
		else {
			render(renderProps);
			$('[data-title], [data-content]').popup();
		}
	});
}
