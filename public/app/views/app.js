/*eslint-env browser*/

import React from 'react';

import _ from 'lodash';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	state = {
		playerData: {
			score: 0
		},
		level: 1,
		difficulty: 1,
		freePlayMode: false
	};

	static childContextTypes = {
		playerData: React.PropTypes.object,
		app: React.PropTypes.object,
		level: React.PropTypes.number,
		difficulty: React.PropTypes.number,
		freePlayMode: React.PropTypes.bool
	};

	getChildContext() {
		return {
			playerData: this.state.playerData,
			level: this.state.level,
			difficulty: this.state.difficulty,
			freePlayMode: this.state.freePlayMode,
			app: {
				addScore: ::this.addScore,
				setDifficulty: ::this.setDifficulty,
				setLevel: ::this.setLevel
			}
		}
	}
	
	addScore(val) {
		this.setState({
			playerData: _.merge({}, this.state.playerData, {
				score: this.state.playerData.score + val
			})
		})
	}

	setDifficulty = (val) => {
		console.log(val, 'diff');
		this.setState({difficulty: Number(val)});
	};

	setLevel = (val) => {
		console.log(val, 'level');
		this.setState({level: Number(val)});
	};


	render() {
		const children = React.Children.map(
			this.props.children,
			(child) => React.cloneElement(child, {
				playerData: this.state.playerData,
				addScore: ::this.addScore
				
			}));
		
		return <div id="app">{children}</div>;
	}
}
