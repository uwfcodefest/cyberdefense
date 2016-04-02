/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';


export default class GameHeader extends React.Component {
	static defaultProps = {
		text: 'Header'
	};

	render() {
		return (
			<div className="header-container">
				<h1 className="ui header">{this.props.text}</h1>
			</div>
		);
	}
}
