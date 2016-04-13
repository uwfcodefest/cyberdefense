/*eslint-env browser*/
'use strict';


export const logger = store => next => action => {
	console.log(`dispatching ${action.type}`);
	let result = next(action);
	console.log('next state', store.getState());
	return result
};

export const crashReporter = () => next => action => {
	try {
		return next(action)
	} catch (err) {
		console.error('Caught an exception!', err);
		throw err
	}
};
