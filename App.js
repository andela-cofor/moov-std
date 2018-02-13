// react libraries
import React from 'react';

// third-libraries
import { StackNavigator } from 'react-navigation';

// screens
import { LandingPage, LoginPage, SignUpPage, MoovPages } from './src/screens';

export default MainStack = StackNavigator({
	LandingPage: {
		screen: LandingPage,
		navigationOptions: {
			header: null,
		}
	},
	LoginPage: {
		screen: LoginPage,
		navigationOptions: {
			header: null,
		}
	},
	SignUpPage: {
		screen: SignUpPage,
		navigationOptions: {
			header: null,
		}
	},
	MoovPages: {
		screen: MoovPages,
		navigationOptions: {
			header: null,
		}
	},
}, {
	navigationOptions: {
		header: 'screen',
	}
});