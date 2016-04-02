/*eslint-env browser*/

import React from 'react';
import {RouteHandler, Link} from 'react-router'
import classnames from 'classnames';
import _ from 'lodash';

//import {RxReact} from '../lib/stream';
// import Backbone from '../backbone';
import SidebarMenu from '../components/menu/sidebar';
// import FollowingMenu from '../components/menu/following';
import Footer from './footer';

class App extends React.Component {
	static defaultProps = {
		menuAnimationDelay: 500
	};

	constructor(props) {
		super(props);
	}

	state = {
		menu: {
			following: {
				visible: false
			},
			sidebar: {
				visible: false
			},
			delayAnimation: false,
			delayTimeout: 0
		}
	};

	componentDidMount() {

	}

	_setSidebarMenu = (visible) => {
		clearTimeout(this.state.menu.delayTimeout);
		this.setState(_.merge({}, this.state, {
			menu: {
				delayAnimation: true,
				sidebar: {
					visible: visible
				},
				delayTimeout: setTimeout(() => this.setState(_.merge({}, this.state, {
					menu: {
						delayAnimation: false
					}
				})), this.props.menuAnimationDelay)
			}
		}));
	};

	_openSidebarMenu = (event) => {
		if (!this.state.menu.sidebar.visible)
			this._setSidebarMenu(true);
		event.stopPropagation();
	};

	_closeSidebarMenu = () => {
		if (this.state.menu.sidebar.visible)
			this._setSidebarMenu(false);
		event.stopPropagation();
	};

	_genLinks = () =>
		_.reduce(this.props.routerState.routes[0].childRoutes, (links, route) => {
			if (route.name != 'root')
				links.push({
					to: route.name, text: route.handler.linkText, icon: route.handler.linkIcon
				});
			return links;
		}, []);

	render() {
		const links = this._genLinks();
		return (
			<div id="site-wrapper" className="pushable pusher">

				<SidebarMenu
					className="sidebar-menu"
					links={links}
					animate={this.state.menu.delayAnimation || this.state.menu.sidebar.visible}
					visible={this.state.menu.sidebar.visible}
					onLinkClick={this._closeSidebarMenu}/>

				<div id="site-body"
				     className={classnames('pusher', {dimmed: this.state.menu.sidebar.visible || this.state.menu.delayAnimation})}
				     onClick={this._closeSidebarMenu}>
					<RouteHandler
						onMenuClick={this._openSidebarMenu}
						links={links}
						{...this.props}/>

					<Footer/>

				</div>

			</div>
		);
	}
}

export default App;
