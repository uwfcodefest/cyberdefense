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
		console.log(val);
	};
	
	componentDidMount() {
		$(ReactDOM.findDOMNode(this))
			.find('.ui.dropdown')
			.dropdown({
				onChange: this.onDifficultyChange
			})
	}

	render() {
		const children = React.Children.map(
			this.props.children, 
			(child) => React.cloneElement(child, this.state));

		console.log(this.state);
		
		return (
			<div className='game-container'>
				<div className="game-wrapper">
					<div className="options-container">
						<div className="ui primary dropdown button">
							<span className="text">Difficulty</span>
							<div className="menu">
								<div className="item" data-value='1'>Easy</div>
								<div className="item" data-value='2'>Normal</div>
								<div className="item" data-value='3'>Hard</div>
							</div>
						</div>
					</div>
					{children}
				</div>
			</div>
		);
	}
}
