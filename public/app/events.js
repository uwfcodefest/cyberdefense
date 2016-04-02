/*eslint-env node*/
'use strict';

import Rx from 'rx';
import {RxStream} from './lib/stream';

export default function init(Backbone) {
	/**
	 *
	 * Initialize system bus
	 *
	 */

	Backbone.page = {
		resize: Rx.Observable.fromEvent(window, 'resize')
	};

	Backbone.nav = {
		transition: new RxStream(),
		menu: new RxStream()
	};

	Backbone.auth = new RxStream();

	/**
	 *
	 * Global events
	 *
	 */

	Backbone.nav.transition
			.listen('navTo')
			.subscribe((state) => {
				console.log('Navigating to ', state);
			});

	Backbone.nav.menu
			.listen('toggle')
			.subscribe(() => {
				console.log('Toggling nav menu');
			});

	Backbone.page.resize
		.subscribe(() => {
			console.log('resize');
		})
}


