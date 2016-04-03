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
		baseRows: 3,
		baseColumns: 3,
		levelScale: 2,
		difficultyScale: 1,
		timer: {
			val: 0,
			set: () => {},
			clear: () => {}
		}
	};

	static contextTypes = {
		playerData: React.PropTypes.object.isRequired,
		level: React.PropTypes.number.isRequired,
		difficulty: React.PropTypes.number.isRequired,
		app: React.PropTypes.object.isRequired
	};
	
	state = {
		answers: {},
		listeners: [],
		bonusScore: 0,
		tries: 0
	};
	
	componentWillMount() {
		this.props.timer.set(60);

		this.setState({
			puzzleData: this.getPuzzleData(this.context.difficulty, this.context.level),
			helperData: this.getHelperData(this.context.difficulty)
		})
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (nextContext.difficulty != this.context.difficulty ||
			nextContext.level != this.context.level) {
			this.setState({
				puzzleData: this.getPuzzleData(nextContext.difficulty, nextContext.level),
				helperData: this.getHelperData(nextContext.difficulty),
				answers: {}
			});
		}
	}
	
	getPuzzleData = (difficulty, level) => 
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
	
	resetAnswers = () => 
		_.map(this.state.listeners, fn => fn());
	
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
	
	submit = () => {
		const correct = _.every(_.map(this.state.puzzleData, (row, i) => {
			return this.checkAnswer(i)
		}));
		
		if (correct) {
			this.setState({
				bonusScore: this.props.timer.val
			}, () => {
				this.props.timer.clear();
				$('.ui.success.modal')
					.modal({
						blurring: true,
						closable  : false,
						onApprove : () => {
							this.context.app.addScore(this.earnedScore);
							this.resetAnswers();
						}
					})
					.modal('show')
			});
			
		}
		else 
			this.setState({tries: ++this.state.tries}, () => {
				$('.ui.error.modal')
					.modal({
						blurring: true,
						onDeny : () => {
							this.context.app.setDifficulty(--this.context.difficulty)
						}
					})
					.modal('show')
			});
	};

	get maxValue() {
		return 2 ** this.getNumPuzzleColumns(this.context.difficulty) - 1
	}
	
	get difficultyScore() {
		return this.context.difficulty * 25;
	}
	
	get levelScore() {
		return this.context.level * 25;
	}
	
	get earnedScore() {
		return this.difficultyScore + this.levelScore + this.state.bonusScore;
	}
	
	get newTotalScore() {
		return this.context.playerData.score + this.earnedScore;
	}
	
	get earnedHugeScore() {
		return this.earnedScore > 100;
	}
	
	render() {
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
							<div className="ui four wide column">+{this.difficultyScore}</div>
						</div>
						<div className="row">
							<div className="ui eight wide column">Level Bonus</div>
							<div className="ui four wide column">+{this.levelScore}</div>
						</div>
						<div className="row">
							<div className="ui eight wide column">Time Bonus</div>
							<div className="ui four wide column">+{this.state.bonusScore}</div>
						</div>
						<div className="ui divider"></div>
						<div className="row">
							<div className="ui eight wide column">Points Earned</div>
							<div className="ui four wide column">+{this.earnedScore}</div>
						</div>
						<div className="ui divider"></div>
						<div className="row">
							<div className="ui eight wide column">Total Points</div>
							<div className="ui four wide column">{this.context.playerData.score} + {this.earnedScore} = {this.newTotalScore}</div>
						</div>
						<div className={classnames('ui grid', {hide: this.earnedHugeScore})}>
							<div className="ui divider"></div>
							<div className="row">
								<div className="ui eight wide column">Achievements</div>
								<div className="ui four wide column">Earned Huge Score!</div>
							</div>
						</div>
					</div>
					<div className="actions">
						<div className="ui huge positive button">Continue</div>
					</div>
				</div>
				
				<div className="ui basic blurring modal error">
					<h1 className="ui header">
						Not quite!
					</h1>
					<div className="actions">
						<div className={classnames("ui huge cancel button", {hide: this.context.difficulty > 1 && this.state.tries < 3})}>Lower difficulty and try again</div>
						<div className="ui huge positive button">Try again</div>
					</div>
				</div>
			</div>
		);
	}
};
