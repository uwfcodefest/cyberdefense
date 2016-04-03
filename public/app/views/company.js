/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

export default class CreateCompany extends React.Component {
	render() {
		return (
			<div className="new-company view ui container">
				<div className="ui segment">
					<h1>Create Your Company</h1>
				</div>
				
				<Link to='/introduction' className='ui huge primary button'>
					Introduction
					<i className="right arrow icon"/>
				</Link>
				
			</div>
		);
	}
};
