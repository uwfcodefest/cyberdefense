/*eslint-env browser*/
'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router';

export default class Introduction extends React.Component {
	render() {
		return (
			<div className="introduction view ui segment container">
				<div className="ui segment">
					<h1 className='ui header'>Introduction</h1>

					<h2 className='ui header'>Hello there and welcome to the accelerated training program at CyberDefense!</h2>

					<p>You couldn't have logged in at a better time, recently one of our field engineers has noticed some suspicious behavior on our backend servers and have promptly notified CyberDefense's NOC (Network Operation Center) of the incident.</p>

					<p>Our lead engineers may have a lead regarding the suspicious behaviour, however it's still too early to tell. We were impressed by your resume and your pass investigational skills on similar matters.
						You come highly recommended by the team over at Parnell Aerospace. We're excited to work with you, hopefully you'll be able to help our team get to the root of this alarmingly suspicious activity, it has the guys in corporate running up the wall! You'll be working closely with our lead engineer on the case.
						We have went ahead and created documentation about our systems, which you will need to use to review the suspicious activity. Please review the documentation attached below so you can be caught up to speed.
						If you have any questions, don't hesitate to ask
						Best of luck,
						Jenna Fischer - HR Manager
					</p>

					<h1 className='ui header'>Systems Overview - How to use the CyberDefense System</h1>

						<h2 className='ui header'>Mission Control System</h2>

						<h3 className='ui header'>First Things, First</h3>
						<p>
							Internally, you may hear the Mission Control System referred to by "the Situation Room" in internal company chat channels. (You'll be getting access tomorrow to our internal slack channels as part of our new hire onboarding procedure.)
							This is an internal code name for the Mission Control System that is used by some of our staff better acquainted with our systems.
						</p>

						<h3 className='ui header'>Mission Selector</h3>
						<p>
							The Mission Selector interface will be in the center of the Mission Control System and will be where you will select which mission to work on.
							Currently, you only have one mission currently assigned and unlocked to you. You'll have more missions unlocked after you successfully complete your first mission, however it may take you several attempts because you will need to
							receive a perfect score before proceeding. We want to ensure you have the necessary skill and attention to detail we need on the job and always remember the best defense can only be played by knowing how to play a solid offense.
						</p>

						<h3 className='ui header'>Notifications and Communications Channel</h3>
						<p>
							On the next page, you will be directed to the Mission Control Dashboard, it will be here that you will receive communication and mission critical, time sensitive updates from CyberDefense.
							These updates will be display on the bottom of the screen.
							<b> Please be sure to log in frequently to check these updates. Our business depends on it.</b>
						</p>

						<h3 className='ui header'>Here is your first mission - Mission 1: Phase 1</h3>
						<p>You will be reviewing binary to help you understand some of the advanced intrusion signatures we have been seeing recently on our firewalls. The signatures have even our brightest engineers baffled.</p>


						<h3 className='ui header'>Are you up for the challenge? Let's do this!</h3>

				</div>

				<Link to='/game/missioncontrol' className='ui huge primary button'>
					Let's Get Started!
					<i className="right arrow icon"/>
				</Link>
				
			</div>
		);
	}
};
