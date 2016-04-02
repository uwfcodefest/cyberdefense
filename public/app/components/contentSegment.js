/*eslint-env browser*/
'use strict';

import React from 'react';

export default class ContentSegment extends React.Component {
	render() {
		return (
			<div className="ui vertical stripe segment">
				<div className="ui middle aligned stackable grid container">
					{this.props.children}
				</div>
			</div>
		)
	}
}

