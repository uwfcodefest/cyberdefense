/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import classnames from 'classnames';

import {Link} from 'react-router';

export default class MainMenu extends React.Component {
	
	render() {
		return (
			<div className="main-menu view ui container">
				<div className="ui masthead segment">
					
					<div className="ui center aligned text container">
						<h1 className="ui masthead header">
							CyberDefense
						</h1>
						<div className="ui button-container">
							<Link to='/company' className="ui huge fluid primary button">New Game </Link>
							<a className="ui huge fluid primary button">About</a>
						</div>
					</div>

				</div>

			</div>
		);
	}
};
