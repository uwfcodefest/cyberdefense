/*eslint-env browser */
'use strict';

import React from 'react';
import Router from 'react-router';
//import $ from 'jquery';
//import semantic from 'semantic';

import Routes from './routes';
//import Backbone from './backbone';

Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
	React.render(<Handler routerState={state}/>, document.querySelector('#app'));
	//$('[data-title], [data-content]').popup();
	//Backbone.nav.transition
	//	.emitMsg('navTo', state);
});
