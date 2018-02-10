// react library
import React from 'react';

// third-party libraries
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// containers
import { MoovHomepage, WalletHomepage, AskHomepage, ProfileHomepage } from '../container';

// component
// import { BasicInformation, NotificationsPage, TransactionsPage } from "../component";


export const MooveHome = StackNavigator({
	MoovHomepage: {
		screen: MoovHomepage,
		navigationOptions: {
			header: null,
		}
	},
}, {
	navigationOptions: {
		header: 'screen',
	},
});

export const WalletHome = StackNavigator({
	WalletHomepage: {
		screen: WalletHomepage,
		navigationOptions: {
			header: null,
		}
	},
}, {
	navigationOptions: {
		header: 'screen',
	},
});

export const AskHome = StackNavigator({
	AskHomepage: {
		screen: AskHomepage,
		navigationOptions: {
			header: null,
		}
	},
}, {
	navigationOptions: {
		header: 'screen',
	},
});
//
export const ProfileHome = StackNavigator({
	ProfileHomepage: {
		screen: ProfileHomepage,
		navigationOptions: {
			header: null,
		}
	},
	// BasicInformation: {
	// 	screen: BasicInformation,
	// 	navigationOptions: {
	// 		header: null,
	// 	}
	// },
	// NotificationsPage: {
	// 	screen: NotificationsPage,
	// 	navigationOptions: {
	// 		header: null,
	// 	}
	// },
	// TransactionsPage: {
	// 	screen: TransactionsPage,
	// 	navigationOptions: {
	// 		header: null,
	// 	}
	// }
}, {
	navigationOptions: {
		// header: '',
	},
});


export const Tabs = TabNavigator({
	Moov: {
		screen: MooveHome,
		navigationOptions: {
			tabBarLabel: 'MOOV',
			color: 'white',
			style: {
				color: '#004a80',
			},
			tabBarIcon: <Icon name="ios-car-outline" type="ionicon" color="white" />,
		},
	},
	Wallet: {
		screen: WalletHome,
		navigationOptions: {
			tabBarLabel: 'Wallet',
			tabBarIcon: <Icon name="credit-card-plus" type="material-community" color="white" />,
		},
	},
	AskUs: {
		screen: AskHome,
		navigationOptions: {
			tabBarLabel: 'Ask Us',
			tabBarIcon: <Icon name="help" type="entypo" color="white" />,
		},
	},
	Profile: {
		screen: ProfileHome,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: <Icon name="user-circle" type="font-awesome" color="white" />,
		},
		style: {
			color: 'green',
		},
	},
}, {
	// tabBarPosition: 'top',
	animationEnabled: true,
	tabBarOptions: {
		style: {
			backgroundColor: '#004a80',
			padding: 2,
			// marginTop: STATUS_BAR_HEIGHT
		},
		indicatorStyle: {
			borderBottomColor: '#ffffff',
			borderBottomWidth: 3,
		},
		tabStyle: {
			borderRightColor: '#004a80',
			borderRightWidth: 1,
		},
		activeTintColor: 'white',
	},
});