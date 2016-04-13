/*eslint-env browser*/
'use strict';

import {connect} from 'react-redux';
import {addScore} from '../../actions/player';
import {setDifficulty} from '../../actions/game';
import BinaryGame from './binary';

const mapStateToProps = (state) => {
	return {
		...state.game,
		score: state.player.score
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addScore: (score) => 
			dispatch(addScore(score)),
		
		setDifficulty: (difficulty) =>
			dispatch(setDifficulty(difficulty))
	}
};

const BinaryGameWrapper = connect(
	mapStateToProps,
	mapDispatchToProps
)(BinaryGame);

export default BinaryGameWrapper
