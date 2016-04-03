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
				<button className="ui huge fluid green button" onClick={this.props.onSubmit}>Submit</button>
				
				<div className='buttons'>
					<button className="ui huge labeled icon primary help button">
						<i className="question icon"/>
						Game Help
					</button>

					<button className="ui huge labeled icon primary info button">
						<i className="info icon"/>
						Topic Info
					</button>
				</div>
				
			</div>
		);
	}
}
