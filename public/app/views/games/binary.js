/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';


import GameHeader from './components/header';
import GameBody from './components/body';
import BinaryInput from './components/binaryInput';

import classnames from 'classnames';


export default class BinaryGame extends React.Component {
	static defaultProps = {
		difficulty: 1,
		level: 1,
		baseRows: 3,
		baseColumns: 3,
		levelScale: 2,
		difficultyScale: 1
	};
	
	state = {
		answers: {},
		listeners: []
	};
	
	componentWillMount() {
		this.setState({
			puzzleData: this.getPuzzleData(this.props.level, this.props.difficulty),
			helperData: this.getHelperData(this.props.difficulty)
		})
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.difficulty != this.props.difficulty ||
				nextProps.level != this.props.level) {
			this.setState({
				puzzleData: this.getPuzzleData(nextProps.level, nextProps.difficulty),
				helperData: this.getHelperData(nextProps.difficulty),
				answers: {}
			});
			_.map(this.state.listeners, fn => fn())
		}
	}
	
	getPuzzleData = (level, difficulty) => 
		_.map(_.range(this.getNumPuzzleRows(level)), () => {
			const data = _.map(_.range(this.getNumPuzzleColumns(difficulty)), () =>
				(Math.random() > 0.5 ? 1 : 0)
			);
			return {
				answer: this.toBase10(data, difficulty),
				data
			}
		});
	
	getHelperData = (difficulty) => 
		_.map(_.range(this.getNumPuzzleColumns(difficulty), 0, -1), i =>
			2 ** (i - 1)
		);
	
	getNumPuzzleRows = (level) =>
		((level - 1) * this.props.levelScale) + this.props.baseRows;

	getNumPuzzleColumns = (difficulty) =>
		((difficulty - 1) * this.props.difficultyScale) + this.props.baseColumns;

	updateAnswer = (row) => {
		return (val) => {
			this.setState({
				answers: _.merge({}, this.state.answers, {
					[row]: val
				})
			})
		}
	};
	
	checkAnswer = (row) => {
		return this.state.puzzleData[row].answer == this.state.answers[row];
	};
		
	
	toBase10 = (rowData, difficulty) => {
		return _.reduce(rowData, (sum, val, i) => {
			return sum + val * (2 ** (this.getNumPuzzleColumns(difficulty) - i - 1));
		}, 0)
	};

	registerListener = (fn) => {
		this.state.listeners.push(fn);
	};
	
	get maxValue() {
		return 2 ** this.getNumPuzzleColumns(this.props.difficulty) - 1
	}
	
	render() {
		console.log(this.state, this.props);
		return (
			<div className="encryption game">
				<GameHeader text='Binary'/>
				<GameBody>
					<div className="ui binary equal width celled grid">
						
						<div className="row binary-helper">
							{_.map(this.state.helperData, (num, i) =>
								<div className="ui column" key={i}>{num}</div>
							)}
							<div className="ui column"></div>
						</div>

						{_.map(this.state.puzzleData, (row, i) =>
							<div className="row" key={i}>
								{_.map(row.data, (num, i) =>
									<div className="ui column" key={i}>{num}</div>
								)}
								<div className={classnames("ui transparent answer input column", {correct: this.checkAnswer(i)})}>
									<BinaryInput 
										max={this.maxValue}
										onChange={this.updateAnswer(i)}
										registerListener={this.registerListener}/>
								</div>
							</div>
						)}
						
						
					</div>
				</GameBody>
			</div>
		);
	}
};
