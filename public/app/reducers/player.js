/*eslint-env browser*/
'use strict';

const initialState = {
	score: 0
};

export default function player(state = initialState, action) {
	switch (action.type) {
		case 'ADD_SCORE':
			return addScore(state, action.payload);
		default:
			return state;
	}
}

export function addScore (state, score) {
	return {
		...state,
		score: state.score + score
	}
}
