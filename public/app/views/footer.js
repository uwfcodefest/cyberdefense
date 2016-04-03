/*eslint-env browser*/
'use strict';

import React from 'react';

export default class Footer extends React.Component {
	static defaultProps = {};
	state = {};

	render() {
		return (
			<div className="ui inverted vertical footer segment">
				<div className="ui container">
					<div className="ui stackable inverted divided equal height stackable grid">
						<div className="three wide column">
							<h4 className="ui inverted header">Links</h4>
							<div className="ui inverted link list">
								<a href="#" className="item">Sitemap</a>
								<a href="#" className="item">Contact Us</a>
								<a href="#" className="item">Documents</a>
								<a href="#" className="item">Login</a>
							</div>
						</div>
						<div className="thirteen wide column">
							<h4 className="ui inverted header">Footer</h4>
							<p>Footer legal text</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
