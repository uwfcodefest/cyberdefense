/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';


export default class GameBody extends React.Component {
	static defaultProps = {};

	render() {
		return (
			<div className="game-body">
				{this.props.children}
			</div>
		);
	}
}
