/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

export default class Home extends React.Component {
	static defaultProps = {
		onLinkClick: () => {},
		links: []
	};
	
	render() {
		return (
			<div className="menu view">
				<div className="ui inverted vertical masthead segment">

					<div className="ui center aligned text container">
						<h1 className="ui inverted header">
							CyberDefense
						</h1>
						<div className="ui button-container">
							<Link to='/' className="ui huge fluid primary button">New Game <i className="ui plus icon"/></Link>
							<Link to='/' className="ui huge fluid primary button">About <i className="ui question icon"/></Link>
						</div>
					</div>

				</div>
				


			</div>
		);
	}
};
