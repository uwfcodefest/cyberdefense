/*eslint-env browser*/

import React from 'react';

export default class App extends React.Component {
	static defaultProps = {
		addStreams: () => {}
	};

	constructor(props) {
		super(props);
	}

	state = {};

	componentDidMount() {

	}

	render() {
		return <div id="app">{this.props.children}</div>;
	}
}
