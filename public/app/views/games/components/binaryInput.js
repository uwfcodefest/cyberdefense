/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';


export default class BinaryInput extends React.Component {
	static defaultProps = {
		onChange: () => {},
		registerListener: () => {},
		max: 1024
	};
	
	state = {
		val: -1
	};
	
	
	handleInput = (e) => {
		const raw = e.target.value;
		const val = Number(raw);
		if (raw !== '' && val <= this.props.max) {
			this.setState({val});
			this.props.onChange(val);
		}
		else if (raw === '') {
			this.setState({val: -1});
			this.props.onChange(-1);
		}
	};
	
	componentDidMount() {
		this.props.registerListener(() => {
			this.setState({
				val: -1
			})
		})
	}

	render() {
		return (
			<input type="text" value={this.state.val >= 0 ? this.state.val : ''} onChange={this.handleInput}/>
		);
	}
}
