/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';
import MenuLink from '../components/menu/link';
import ContentSegment from '../components/contentSegment';

export default class Home extends React.Component {
	static route = 'home';
	static linkText = 'Home';
	static linkIcon = 'home';

	static defaultProps = {
		onLinkClick: () => {},
		links: []
	};
	
	render() {
		return (
			<div className="view home">
				<div className="ui view home inverted vertical masthead center aligned segment">

					<div className="ui container">
						<div className="ui large secondary inverted pointing menu">
							<a className="toc item" onClick={this.props.onMenuClick}>
								<i className="sidebar icon"/>
							</a>
							{this.props.links.map((link) =>
								<MenuLink
									key={link.to}
									to={link.to}
									icon={link.icon}
									text={link.text}
									onClick={this.props.onLinkClick}
								/>
							)}

						</div>
					</div>

					<div className="ui text container">
						<h1 className="ui inverted header">
							CyberDefense
						</h1>
						<h2 className="ui inverted header">cyberdefense</h2>
						<Link to='/' className="ui huge primary button">Get Started <i className="arrow right icon"/></Link>
					</div>

				</div>
				
				<ContentSegment>
					<div className="column">
						<h1>Welcome!</h1>
						<p>
							CyberDefense: UWF Codefest 2016 CyberDefense app
						</p>
					</div>
					
				</ContentSegment>

			</div>
		);
	}
};
