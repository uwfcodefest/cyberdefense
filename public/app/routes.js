/*eslint-env node*/
'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './views/app';
import MainMenu from './views/mainMenu';
import CreateCompany from './views/company';
import Introduction from './views/introduction';
import MissionControl from './views/missionControl';
import HighScores from './views/highscores';

import GameWrapper from './components/gameWrapper';
import BinaryGame from './views/games/binary';


const Routes = (
	<Route component={App} path='/'>
		<IndexRoute component={MainMenu}/>
		<Route component={CreateCompany} path='/company'/>
		<Route component={Introduction} path='/introduction'/>
		<Route component={HighScores} path='/highscores'/>
		<Route component={GameWrapper} path='/game'>
			<Route component={BinaryGame} path='/game/binary'/>
			<Route component={MissionControl} path='/game/missioncontrol'/>
		</Route>
	</Route>
);

export default Routes;
