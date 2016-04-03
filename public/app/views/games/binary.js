/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';


import GameHeader from './components/header';
import GameBody from './components/body';
import GameFooter from './components/footer';
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
		listeners: [],
		score: 10
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
	
	submit = () => {
		const correct = _.every(_.map(this.state.puzzleData, (row, i) => {
			return this.checkAnswer(i)
		}));
		
		if (correct) {
			$('.ui.success.modal')
				.modal({
					blurring: true,
					closable  : false,
					onApprove : function() {
						window.alert('Approved!');
					}
				})
				.modal('show')
		}
		else {
			$('.ui.error.modal')
				.modal('show')
		}
	};
	
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
								<div className={classnames("ui transparent answer input column")}>
									<BinaryInput 
										max={this.maxValue}
										onChange={this.updateAnswer(i)}
										registerListener={this.registerListener}/>
								</div>
							</div>
						)}
						
					</div>
				</GameBody>
				<GameFooter onSubmit={this.submit}/>
				
				<div className="ui basic blurring modal success">
					<h1 className="ui header">
						Good Job!
					</h1>
					<div className="ui content divided grid">
						<div className="row">
							<div className="ui eight wide column">Difficulty Bonus</div>
							<div className="ui four wide column">+{this.props.difficulty * 25}</div>
						</div>
						<div className="row">
							<div className="ui eight wide column">Level Bonus</div>
							<div className="ui four wide column">+{this.props.level * 25}</div>
						</div>
						<div className="row">
							<div className="ui eight wide column">Time Bonus</div>
							<div className="ui four wide column">+15</div>
						</div>
						<div className="ui divider"></div>
						<div className="row">
							<div className="ui eight wide column">Points Earned</div>
							<div className="ui four wide column">+15</div>
						</div>
						<div className="ui fat divider"></div>
						<div className="row">
							<div className="ui eight wide column">Total Points</div>
							<div className="ui four wide column">15 + 15 = 30</div>
						</div>
					</div>
					<div className="actions">
						<div className="ui huge positive button">OK</div>
					</div>
				</div>

				<div className="ui basic blurring modal error">
					<h1 className="ui header">
						WRONG!
					</h1>
					<div className="actions">
						<div className="ui huge positive button">Try again</div>
					</div>
				</div>
			</div>
		);
	}
};
