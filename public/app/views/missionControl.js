/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

export default class MissionControl extends React.Component {
	static defaultProps = {
		showAttackDelay: 1000
	};
	
	state = {
		showDifficulties: false,
		showAttack: false
	};

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
		router:React.PropTypes.object.isRequired
	};

	showDifficultyMenu = (e) => {
		e.preventDefault();
		this.setState({showDifficulties: true});
		return false;
	};
	
	launchGame = (difficulty) => {
		return () => {
			this.context.router.push('/game/binary');
			this.context.store.dispatch({
				type: 'SET_DIFFICULTY',
				payload: difficulty
			});
		}
	};
	
	componentDidMount() {
		setTimeout(() => {
			this.setState({showAttack: true})
		}, this.props.showAttackDelay)
	}
	
	render() {
		return (
			<div className="mission-control view ui container">
				<div className="ui grid segment">
					<h1>Mission Control</h1>
					
					<div className="row">
						<div className="column">
							<div className="ui blue cards">
								<a href='/game/binary' className={classnames("ui card", {animate: this.state.showAttack && !this.state.showDifficulties})} onClick={this.showDifficultyMenu}>
									<div className="content">
										<h1 className="ui header">
											Phase I: Binary
										</h1>
									</div>
									<div className="content">
										<i className="massive game icon"/>
									</div>
									<div className={classnames('ui vertical content buttons', {hide: !this.state.showDifficulties})}>
										<button className="ui fluid button" onClick={this.launchGame(1)}>
											Easy (+25 Bonus Points)
										</button>
										<button className="ui fluid button" onClick={this.launchGame(2)}>
											Medium (+50 Bonus Points)
										</button>
										<button className="ui fluid button" onClick={this.launchGame(3)}>
											Hard (+75 Bonus Points)
										</button>
									</div>
								</a>

								<a href='/game/missioncontrol#' className="ui locked card">
									<div className="content">
										<h1 className="ui header">
											Locked
										</h1>
									</div>
									<div className="content">
										<i className="massive lock icon"/>
									</div>
								</a>

								<a href='/game/missioncontrol#' className="ui locked card">
									<div className="content">
										<h1 className="ui header">
											Locked
										</h1>
									</div>
									<div className="content">
										<i className="massive lock icon"/>
									</div>
								</a>
							</div>
						</div>
					</div>
					
					<div className={classnames("row animate", {hide: !this.state.showAttack})}>
						<div className="column">
							<div className="ui fluid blue attack card">
								<div className="content">
									<h1 className="ui header left aligned">
										Incoming Attack!
									</h1>
								</div>
								<div className="content">
									<p>
										Congrats Steve on the promotion of making the Blue Team! 
										However, I hate to ruin the warm welcoming party but we have a situation that we want you to look 
										at specifically. We have discovered some suspicious looking binary code on our back end. 
										The sooner you click on the flashing button; the sooner we can get down to the bottom of 
										this suspiciously activity that is being spread across our backend.
									</p>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				
			</div>
		);
	}
};
