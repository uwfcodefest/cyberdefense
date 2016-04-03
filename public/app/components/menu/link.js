/*eslint-env browser*/
'use strict';

import React from 'react';
import {Link} from 'react-router';
//import {RxReact} from '../../lib/stream';
import classnames from 'classnames';
import _ from 'lodash';

export default class MenuLink extends React.Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		to: 'home',
		text: 'Link',
		icon: 'linkify',
		onClick: () => {
		}
	};

	render() {
		return (
			<Link className="item" to={this.props.to} onClick={this.props.onClick}>
				<i className={classnames('icon', this.props.icon)}/>
				{this.props.text}
			</Link>
		);
	}
}

