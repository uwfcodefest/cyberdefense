/*eslint-env browser*/
'use strict';


export function addScore (score) {
	return {
		type: 'ADD_SCORE',
		payload: score
	}
}
