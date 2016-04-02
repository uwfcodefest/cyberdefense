/*eslint-env node*/
'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router'
import App from './views/app';
import Home from './views/home';

const Routes = (
	<Route handler={App} name='root' path='/'>
		<DefaultRoute handler={Home} name={Home.route}/>
	</Route>
);

export default Routes;
