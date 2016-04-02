/*eslint-env browser */
'use strict';

import _ from 'lodash';

import initAPI from './lib/api';
import initEvents from './events';

let Backbone = {
	api: {}
};
export default Backbone;

// Initialize event bus
window.Backbone = Backbone;
initAPI(Backbone);
initEvents(Backbone);
