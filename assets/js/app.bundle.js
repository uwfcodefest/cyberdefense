(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\components\\contentSegment.js":[function(require,module,exports){
/*eslint-env browser*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentSegment = function (_React$Component) {
	_inherits(ContentSegment, _React$Component);

	function ContentSegment() {
		_classCallCheck(this, ContentSegment);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ContentSegment).apply(this, arguments));
	}

	_createClass(ContentSegment, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'ui vertical stripe segment' },
				_react2.default.createElement(
					'div',
					{ className: 'ui middle aligned stackable grid container' },
					this.props.children
				)
			);
		}
	}]);

	return ContentSegment;
}(_react2.default.Component);

exports.default = ContentSegment;

},{"react":"react"}],"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\components\\menu\\link.js":[function(require,module,exports){
/*eslint-env browser*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import {RxReact} from '../../lib/stream';


var MenuLink = function (_React$Component) {
	_inherits(MenuLink, _React$Component);

	function MenuLink(props) {
		_classCallCheck(this, MenuLink);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuLink).call(this, props));
	}

	_createClass(MenuLink, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactRouter.Link,
				{ className: 'item', to: this.props.to, onClick: this.props.onClick },
				_react2.default.createElement('i', { className: (0, _classnames2.default)('icon', this.props.icon) }),
				this.props.text
			);
		}
	}]);

	return MenuLink;
}(_react2.default.Component);

MenuLink.defaultProps = {
	to: 'home',
	text: 'Link',
	icon: 'linkify',
	onClick: function onClick() {}
};
exports.default = MenuLink;

},{"classnames":"classnames","lodash":"lodash","react":"react","react-router":"react-router"}],"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\index.js":[function(require,module,exports){
/*eslint-env browser */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _semantic = require('semantic');

var _semantic2 = _interopRequireDefault(_semantic);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

route();

_reactRouter.browserHistory.listen(function (loc) {
	// window.ga('send', 'pageview', loc.pathname);
});

function render(props) {
	_reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, props), document.querySelector('#app'));
}

function route() {
	(0, _reactRouter.match)({ history: _reactRouter.browserHistory, routes: _routes2.default }, function (err, redirectLocation, renderProps) {
		if (redirectLocation) {
			console.log('Redirecting to ' + redirectLocation.pathname);
			_reactRouter.browserHistory.replace(redirectLocation);
			route();
		} else if (err || !renderProps) {
			console.log('Route Not Found');
			_reactRouter.browserHistory.push('/login');
			route();
		} else {
			render(renderProps);
			(0, _jquery2.default)('[data-title], [data-content]').popup();
		}
	});
}

},{"./routes":"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\routes.js","jquery":"jquery","react":"react","react-dom":"react-dom","react-router":"react-router","semantic":"semantic"}],"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\routes.js":[function(require,module,exports){
/*eslint-env node*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./views/app');

var _app2 = _interopRequireDefault(_app);

var _home = require('./views/home');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = _react2.default.createElement(
	_reactRouter.Route,
	{ handler: _app2.default, name: 'root', path: '/' },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default, name: _home2.default.route })
);

exports.default = Routes;

},{"./views/app":"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\views\\app.js","./views/home":"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\views\\home.js","react":"react","react-router":"react-router"}],"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\views\\app.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-env browser*/

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(App, [{
		key: "componentDidMount",
		value: function componentDidMount() {}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "app" },
				this.props.children
			);
		}
	}]);

	return App;
}(_react2.default.Component);

App.defaultProps = {
	addStreams: function addStreams() {}
};
exports.default = App;

},{"react":"react"}],"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\views\\home.js":[function(require,module,exports){
/*eslint-env browser*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _link = require('../components/menu/link');

var _link2 = _interopRequireDefault(_link);

var _contentSegment = require('../components/contentSegment');

var _contentSegment2 = _interopRequireDefault(_contentSegment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	}

	_createClass(Home, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'view home' },
				_react2.default.createElement(
					'div',
					{ className: 'ui view home inverted vertical masthead center aligned segment' },
					_react2.default.createElement(
						'div',
						{ className: 'ui container' },
						_react2.default.createElement(
							'div',
							{ className: 'ui large secondary inverted pointing menu' },
							_react2.default.createElement(
								'a',
								{ className: 'toc item', onClick: this.props.onMenuClick },
								_react2.default.createElement('i', { className: 'sidebar icon' })
							),
							this.props.links.map(function (link) {
								return _react2.default.createElement(_link2.default, {
									key: link.to,
									to: link.to,
									icon: link.icon,
									text: link.text,
									onClick: _this2.props.onLinkClick
								});
							})
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'ui text container' },
						_react2.default.createElement(
							'h1',
							{ className: 'ui inverted header' },
							'CyberDefense'
						),
						_react2.default.createElement(
							'h2',
							{ className: 'ui inverted header' },
							'cyberdefense'
						),
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/', className: 'ui huge primary button' },
							'Get Started ',
							_react2.default.createElement('i', { className: 'arrow right icon' })
						)
					)
				),
				_react2.default.createElement(
					_contentSegment2.default,
					null,
					_react2.default.createElement(
						'div',
						{ className: 'column' },
						_react2.default.createElement(
							'h1',
							null,
							'Welcome!'
						),
						_react2.default.createElement(
							'p',
							null,
							'CyberDefense: UWF Codefest 2016 CyberDefense app'
						)
					)
				)
			);
		}
	}]);

	return Home;
}(_react2.default.Component);

Home.route = 'home';
Home.linkText = 'Home';
Home.linkIcon = 'home';
Home.defaultProps = {
	onLinkClick: function onLinkClick() {},
	links: []
};
exports.default = Home;
;

},{"../components/contentSegment":"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\components\\contentSegment.js","../components/menu/link":"C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\components\\menu\\link.js","lodash":"lodash","react":"react","react-router":"react-router"}]},{},["C:\\Users\\admin\\Google Drive\\Projects\\Open Source\\CyberDefense\\public\\app\\index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWNcXGFwcFxcY29tcG9uZW50c1xcY29udGVudFNlZ21lbnQuanMiLCJwdWJsaWNcXGFwcFxcY29tcG9uZW50c1xcbWVudVxcbGluay5qcyIsInB1YmxpY1xcYXBwXFxpbmRleC5qcyIsInB1YmxpY1xcYXBwXFxyb3V0ZXMuanMiLCJwdWJsaWNcXGFwcFxcdmlld3NcXGFwcC5qcyIsInB1YmxpY1xcYXBwXFx2aWV3c1xcaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNDQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsyQkFDWDtBQUNSLFVBQ0M7O01BQUssV0FBVSw0QkFBVixFQUFMO0lBQ0M7O09BQUssV0FBVSw0Q0FBVixFQUFMO0tBQ0UsS0FBSyxLQUFMLENBQVcsUUFBWDtLQUZIO0lBREQsQ0FEUTs7OztRQURXO0VBQXVCLGdCQUFNLFNBQU47O2tCQUF2Qjs7OztBQ0pyQjs7Ozs7Ozs7QUFFQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsQ0FBWSxLQUFaLEVBQW1CO3dCQURDLFVBQ0Q7O2dFQURDLHFCQUViLFFBRFk7RUFBbkI7O2NBRG9COzsyQkFhWDtBQUNSLFVBQ0M7O01BQU0sV0FBVSxNQUFWLEVBQWlCLElBQUksS0FBSyxLQUFMLENBQVcsRUFBWCxFQUFlLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFuRDtJQUNDLHFDQUFHLFdBQVcsMEJBQVcsTUFBWCxFQUFtQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQTlCLEVBQUgsQ0FERDtJQUVFLEtBQUssS0FBTCxDQUFXLElBQVg7SUFISCxDQURROzs7O1FBYlc7RUFBaUIsZ0JBQU0sU0FBTjs7QUFBakIsU0FLYixlQUFlO0FBQ3JCLEtBQUksTUFBSjtBQUNB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LEVBQUgsQ0FBNUQ7T0FMRDtNQXBCRDtLQUREO0lBK0JDOzs7S0FDQzs7UUFBSyxXQUFVLFFBQVYsRUFBTDtNQUNDOzs7O09BREQ7TUFFQzs7OztPQUZEO01BREQ7S0EvQkQ7SUFERCxDQURROzs7O1FBVlc7RUFBYSxnQkFBTSxTQUFOOztBQUFiLEtBQ2IsUUFBUTtBQURLLEtBRWIsV0FBVztBQUZFLEtBR2IsV0FBVztBQUhFLEtBS2IsZUFBZTtBQUNyQixjQUFhLHVCQUFNLEVBQU47QUFDYixRQUFPLEVBQVA7O2tCQVBtQjtBQXdEcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyplc2xpbnQtZW52IGJyb3dzZXIqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFNlZ21lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdHJlbmRlcigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidWkgdmVydGljYWwgc3RyaXBlIHNlZ21lbnRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInVpIG1pZGRsZSBhbGlnbmVkIHN0YWNrYWJsZSBncmlkIGNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuIiwiLyplc2xpbnQtZW52IGJyb3dzZXIqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge0xpbmt9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcbi8vaW1wb3J0IHtSeFJlYWN0fSBmcm9tICcuLi8uLi9saWIvc3RyZWFtJztcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51TGluayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcclxuXHRcdHN1cGVyKHByb3BzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcblx0XHR0bzogJ2hvbWUnLFxyXG5cdFx0dGV4dDogJ0xpbmsnLFxyXG5cdFx0aWNvbjogJ2xpbmtpZnknLFxyXG5cdFx0b25DbGljazogKCkgPT4ge1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaW5rIGNsYXNzTmFtZT1cIml0ZW1cIiB0bz17dGhpcy5wcm9wcy50b30gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT5cclxuXHRcdFx0XHQ8aSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2ljb24nLCB0aGlzLnByb3BzLmljb24pfS8+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMudGV4dH1cclxuXHRcdFx0PC9MaW5rPlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcbiIsIi8qZXNsaW50LWVudiBicm93c2VyICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgc2VtYW50aWMgZnJvbSAnc2VtYW50aWMnO1xyXG5pbXBvcnQge21hdGNoLCBicm93c2VySGlzdG9yeSwgUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5cclxuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XHJcblxyXG5yb3V0ZSgpO1xyXG5cclxuYnJvd3Nlckhpc3RvcnkubGlzdGVuKChsb2MpID0+IHtcclxuXHQvLyB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCBsb2MucGF0aG5hbWUpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcihwcm9wcykge1xyXG5cdFJlYWN0RE9NLnJlbmRlcig8Um91dGVyIHsuLi5wcm9wc30vPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm91dGUoKSB7XHJcblx0bWF0Y2goe2hpc3Rvcnk6IGJyb3dzZXJIaXN0b3J5LCByb3V0ZXM6IFJvdXRlc30sIChlcnIsIHJlZGlyZWN0TG9jYXRpb24sIHJlbmRlclByb3BzKSA9PiB7XHJcblx0XHRpZiAocmVkaXJlY3RMb2NhdGlvbikge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgUmVkaXJlY3RpbmcgdG8gJHtyZWRpcmVjdExvY2F0aW9uLnBhdGhuYW1lfWApO1xyXG5cdFx0XHRicm93c2VySGlzdG9yeS5yZXBsYWNlKHJlZGlyZWN0TG9jYXRpb24pO1xyXG5cdFx0XHRyb3V0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZXJyIHx8ICFyZW5kZXJQcm9wcykge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgUm91dGUgTm90IEZvdW5kYCk7XHJcblx0XHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xyXG5cdFx0XHRyb3V0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJlbmRlcihyZW5kZXJQcm9wcyk7XHJcblx0XHRcdCQoJ1tkYXRhLXRpdGxlXSwgW2RhdGEtY29udGVudF0nKS5wb3B1cCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiIsIi8qZXNsaW50LWVudiBub2RlKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vdmlld3MvYXBwJztcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi92aWV3cy9ob21lJztcclxuXHJcbmNvbnN0IFJvdXRlcyA9IChcclxuXHQ8Um91dGUgaGFuZGxlcj17QXBwfSBuYW1lPSdyb290JyBwYXRoPScvJz5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17SG9tZX0gbmFtZT17SG9tZS5yb3V0ZX0vPlxyXG5cdDwvUm91dGU+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXM7XHJcbiIsIi8qZXNsaW50LWVudiBicm93c2VyKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcblx0XHRhZGRTdHJlYW1zOiAoKSA9PiB7fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcblx0XHRzdXBlcihwcm9wcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0ZSA9IHt9O1xyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHRyZXR1cm4gPGRpdiBpZD1cImFwcFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PjtcclxuXHR9XHJcbn1cclxuIiwiLyplc2xpbnQtZW52IGJyb3dzZXIqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5pbXBvcnQgTWVudUxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51L2xpbmsnO1xyXG5pbXBvcnQgQ29udGVudFNlZ21lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb250ZW50U2VnbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgcm91dGUgPSAnaG9tZSc7XHJcblx0c3RhdGljIGxpbmtUZXh0ID0gJ0hvbWUnO1xyXG5cdHN0YXRpYyBsaW5rSWNvbiA9ICdob21lJztcclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuXHRcdG9uTGlua0NsaWNrOiAoKSA9PiB7fSxcclxuXHRcdGxpbmtzOiBbXVxyXG5cdH07XHJcblx0XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ2aWV3IGhvbWVcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInVpIHZpZXcgaG9tZSBpbnZlcnRlZCB2ZXJ0aWNhbCBtYXN0aGVhZCBjZW50ZXIgYWxpZ25lZCBzZWdtZW50XCI+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1aSBjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1aSBsYXJnZSBzZWNvbmRhcnkgaW52ZXJ0ZWQgcG9pbnRpbmcgbWVudVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cInRvYyBpdGVtXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbk1lbnVDbGlja30+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJzaWRlYmFyIGljb25cIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmxpbmtzLm1hcCgobGluaykgPT5cclxuXHRcdFx0XHRcdFx0XHRcdDxNZW51TGlua1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRrZXk9e2xpbmsudG99XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvPXtsaW5rLnRvfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uPXtsaW5rLmljb259XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQ9e2xpbmsudGV4dH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkxpbmtDbGlja31cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0KX1cclxuXHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1aSB0ZXh0IGNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwidWkgaW52ZXJ0ZWQgaGVhZGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0Q3liZXJEZWZlbnNlXHJcblx0XHRcdFx0XHRcdDwvaDE+XHJcblx0XHRcdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJ1aSBpbnZlcnRlZCBoZWFkZXJcIj5jeWJlcmRlZmVuc2U8L2gyPlxyXG5cdFx0XHRcdFx0XHQ8TGluayB0bz0nLycgY2xhc3NOYW1lPVwidWkgaHVnZSBwcmltYXJ5IGJ1dHRvblwiPkdldCBTdGFydGVkIDxpIGNsYXNzTmFtZT1cImFycm93IHJpZ2h0IGljb25cIi8+PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxDb250ZW50U2VnbWVudD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdDxoMT5XZWxjb21lITwvaDE+XHJcblx0XHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRcdEN5YmVyRGVmZW5zZTogVVdGIENvZGVmZXN0IDIwMTYgQ3liZXJEZWZlbnNlIGFwcFxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdDwvQ29udGVudFNlZ21lbnQ+XHJcblxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59O1xyXG4iXX0=
