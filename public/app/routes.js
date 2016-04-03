/*eslint-env node*/
'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './views/app';
import Home from './views/home';

import GameWrapper from './components/gameWrapper';
import BinaryGame from './views/games/binary';


const Routes = (
	<Route component={App} path='/'>
		<IndexRoute component={Home}/>
		<Route component={GameWrapper} path='/game'>
			<Route component={BinaryGame} path='/game/binary'/>
		</Route>
	</Route>
);

export default Routes;
