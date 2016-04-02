/*eslint-env browser */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import semantic from 'semantic';
import {match, browserHistory, Router} from 'react-router';

import Routes from './routes';

route();

browserHistory.listen((loc) => {
	// window.ga('send', 'pageview', loc.pathname);
});

function render(props) {
	ReactDOM.render(<Router {...props}/>, document.querySelector('#app'));
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
			browserHistory.push('/login');
			route();
		}
		else {
			render(renderProps);
			$('[data-title], [data-content]').popup();
		}
	});
}
