/*eslint-env browser*/
'use strict';

export function setLevel(level) {
	return {
		type: 'SET_LEVEL',
		payload: level
	}
}

export function setDifficulty(difficulty) {
	return {
		type: 'SET_DIFFICULTY',
		payload: difficulty
	}
}

export function setFreePlayMode(freePlayMode) {
	return {
		type: 'SET_FREEPLAY_MODE',
		payload: freePlayMode
	}
}
