/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import {Link} from 'react-router';

export default class MissionControl extends React.Component {
	state = {
		showDifficulties: false
	};

	showDifficultyMenu = (e) => {
		e.preventDefault();
		this.setState({showDifficulties: true});
		return false;
	};
	
	launchGame = (difficulty) => {
		return () => {
			console.log(this.props.location, difficulty);
		}
	};
	
	render() {
		return (
			<div className="mission-control view ui container">
				<div className="ui segment">
					<h1>Mission Control</h1>
					
					<div className="ui blue cards">
						<a href='/game/binary' className="ui card" onClick={this.showDifficultyMenu}>
							<div className="content">
								<h1 className="ui header">
									Binary
								</h1>
							</div>
							<div className="content">
								<i className="massive game icon"/>
							</div>
							<div className={classnames('content buttons', {hide: !this.state.showDifficulties})}>
								<button className="ui fluid button" onClick={this.launchGame(1)}>
									Easy
								</button>
								<button className="ui fluid button" onClick={this.launchGame(2)}>
									Medium
								</button>
								<button className="ui fluid button" onClick={this.launchGame(3)}>
									Hard
								</button>
							</div>
						</a>

						<a href='/missioncontrol#' className="ui locked card">
							<div className="content">
								<h1 className="ui header">
									Locked
								</h1>
							</div>
							<div className="content">
								<i className="massive lock icon"/>
							</div>
						</a>

						<a href='/missioncontrol#' className="ui locked card">
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
		);
	}
};
