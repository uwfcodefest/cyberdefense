/*eslint-env browser*/
'use strict';

const initialState = {
	level: 1,
	difficulty: 1,
	freePlayMode: false
};

export default function game(state = initialState, action) {
	switch (action.type) {
		case 'SET_LEVEL':
			return setLevel(state, action.payload);
		case 'SET_DIFFICULTY':
			return setDifficulty(state, action.payload);
		case 'SET_FREEPLAY_MODE':
			return setFreePlayMode(state, action.payload);
		default:
			return state;
	}
}

export function setLevel(state, level) {
	return {
		...state,
		level
	}
}

export function setDifficulty(state, difficulty) {
	return {
		...state,
		difficulty
	}
}

export function setFreePlayMode(state, freePlayMode) {
	return {
		...state,
		freePlayMode
	}
}
