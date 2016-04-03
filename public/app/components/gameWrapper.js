/*eslint-env browser*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import classnames from 'classnames';

export default class GameWrapper extends React.Component {
	state = {
		timer: {
			val: 0,
			intervalID: null
		}
	};

	static contextTypes = {
		playerData: React.PropTypes.object.isRequired,
		level: React.PropTypes.number.isRequired,
		difficulty: React.PropTypes.number.isRequired,
		app: React.PropTypes.object.isRequired,
		router: React.PropTypes.object.isRequired
	};

	onDifficultyChange = (val) => {
		this.context.app.setDifficulty(Number(val));
	};

	onLevelChange = (val) => {
		this.context.app.setLevel(Number(val));
	};
	
	setTimer = (val) => {
		this.setState({
			timer: {
				val: val,
				intervalID: setInterval(::this.decrementTimer, 1000)
			}
		});
	};
	
	decrementTimer = () => {
		if (this.state.timer.val > 0)
			this.setState({
				timer: _.merge({}, this.state.timer, {
					val: --this.state.timer.val
				})
			});
		else 
			this.clearTimer();
	};
	
	clearTimer = () => {
		clearInterval(this.state.timer.intervalID);
		this.setState({
			timer: {
				val: 0,
				intervalID: null
			}
		})
	};
	
	componentDidMount() {
		$(ReactDOM.findDOMNode(this))
			.find('.ui.dropdown.difficulty')
			.dropdown({
				onChange: this.onDifficultyChange
			});

		$(ReactDOM.findDOMNode(this))
			.find('.ui.dropdown.level')
			.dropdown({
				onChange: this.onLevelChange
			})
	}
	
	get difficulty() {
		return [
			'Easy',
			'Normal',
			'Hard'
		][this.context.difficulty - 1]
	}
	
	get onMissionControlPage() {
		return this.props.location.pathname == 'game/missioncontrol'
	}

	render() {
		const children = React.Children.map(
			this.props.children, 
			(child) => React.cloneElement(child, {
				timer: {
					val: this.state.timer.val,
					set: this.setTimer,
					clear: this.clearTimer
				}
			}));

		return (
			<div className='game-container'>
				<div className="ui game-wrapper container">
					<div className={classnames('options-container', {hide: !this.context.freePlayMode})}>
						<div className="ui huge primary difficulty dropdown button">
							<span className="text">Difficulty</span>
							<div className="menu">
								<div className="item" data-value='1'>Easy</div>
								<div className="item" data-value='2'>Normal</div>
								<div className="item" data-value='3'>Hard</div>
							</div>
						</div>

						<div className="ui huge primary level dropdown button">
							<span className="text">Level</span>
							<div className="menu">
								<div className="item" data-value='1'>1</div>
								<div className="item" data-value='2'>2</div>
								<div className="item" data-value='3'>3</div>
							</div>
						</div>
						
					</div>

					<div className="ui four statistics meta-container">
						<div className="ui statistic score">
							<div className="label">Current Score</div>
							<div className="value">{this.context.playerData.score || '0'}</div>
						</div>
						
						<div className={classnames('ui statistic timer', {hide: this.onMissionControlPage})}>
							<div className="label">Bonus Score Remaining</div>
							<div className="value">{this.state.timer.val}</div>
						</div>

						<div className={classnames('ui statistic level', {hide: this.onMissionControlPage})}>
							<div className="label">Level</div>
							<div className="value">{this.context.level}</div>
						</div>

						<div className={classnames('ui statistic difficulty', {hide: this.onMissionControlPage})}>
							<div className="label">Difficulty</div>
							<div className="text value">{this.difficulty}</div>
						</div>
						
					</div>
					
					{children}
				</div>
			</div>
		);
	}
}
