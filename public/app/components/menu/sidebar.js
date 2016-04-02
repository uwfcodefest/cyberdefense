/*eslint-env browser*/
'use strict';

import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

//import {RxReact} from '../../lib/stream';
import MenuLink from './link';

class SidebarMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		animate: false,
		visible: false,
		links: [],
		onLinkClick: () => {
		}
	};

	_classes = () =>
		classnames('ui vertical inverted sidebar menu left uncover', {
			'animating': this.props.animate,
			visible: this.props.visible
		}, this.props.className || '');

	render() {
		return (
			<div className={this._classes()}>
				<div className="item">
					<div className="menu">
						{this.props.links.map((link) =>
							<MenuLink
								key={link.to}
								to={link.to}
								icon={link.to}
								text={link.text}
								onClick={this.props.onLinkClick}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default SidebarMenu
