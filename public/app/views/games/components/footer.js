/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';


export default class GameFooter extends React.Component {
	static defaultProps = {
		onSubmit: () => {}
	};

	render() {
		return (
			<div className="game-footer">
				<button className="ui huge fluid submit button" onClick={this.props.onSubmit}>Submit</button>
				
				<div className='buttons'>
					<button className="ui huge icon button">
						<i className="info icon"/>
					</button>

					<button className="ui huge icon button">
						<i className="question icon"/>
					</button>
				</div>
				
			</div>
		);
	}
}
