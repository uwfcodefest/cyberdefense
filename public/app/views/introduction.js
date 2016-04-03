/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

export default class Introduction extends React.Component {
	render() {
		return (
			<div className="introduction view ui container">
				<div className="ui segment">
					<h1>Introduction</h1>
				</div>

				<Link to='/game/missioncontrol' className='ui huge primary button'>
					Let's Get Started!
					<i className="right arrow icon"/>
				</Link>
				
			</div>
		);
	}
};
