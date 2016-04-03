/*eslint-env browser*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


export default class GameWrapper extends React.Component {
	static defaultProps = {};
	
	state = {
		difficulty: 1,
		level: 1
	};
	
	onDifficultyChange = (val) => {
		this.setState({difficulty: Number(val)});
	};

	onLevelChange = (val) => {
		this.setState({level: Number(val)});
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

	render() {
		const children = React.Children.map(
			this.props.children, 
			(child) => React.cloneElement(child, this.state));

		return (
			<div className='game-container'>
				<div className="ui game-wrapper container">
					<div className="options-container">
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
					{children}
				</div>
			</div>
		);
	}
}
