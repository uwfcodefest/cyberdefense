/*eslint-env node*/
'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router'
import App from './views/app';
import Home from './views/home';

const Routes = (
	<Route handler={App} name='root' path='/'>
		<IndexRoute component={Home} name={Home.route}/>
	</Route>
);

export default Routes;
