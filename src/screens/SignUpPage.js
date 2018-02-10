// react libraries
import React from 'react';

// react-native libraries
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
}from 'react-native';

// commom
import { StatusBarComponent, HeaderComponent } from "../common";
import firebase from "firebase";
import { NavigationActions } from 'react-navigation';

class SignUpPage extends React.Component {
	/**
	 * constructor
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			loading: false,
			autoFocus: false,
			firstName: '',
			lastName: '',
		};
	}
	
	/**
	 * componentWillMount
	 *
	 * React life-cycle method initialize firebase app
	 * @return {void}
	 */
	componentWillMount() {
		if (firebase.apps.length === 0) {
			firebase.initializeApp({
				apiKey: "AIzaSyD0ZJS7tPUrOWkZEZQRXDLQfLRT2yxhKMM",
				authDomain: "moov-68c37.firebaseapp.com",
				databaseURL: "https://moov-68c37.firebaseio.com",
				projectId: "moov-68c37",
				storageBucket: "moov-68c37.appspot.com",
				messagingSenderId: "1050975255216"
			});
		}
	}
	
	render() {
		const { container, activityIndicator } = styles;
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: 'LandingPage'})
			]
		});
		
		// activity indicator
		if (this.state.loading) {
			return (
				<View style={{flex: 1}}>
					<ActivityIndicator
						color = '#004a80'
						size = "large"
						style={activityIndicator}
					/>
				</View>
			);
		}
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<HeaderComponent
					backgroundColor='#004a80'
					leftIconColor='#fff'
					rightIconColor='#fff'
					centerTextColor='#fff'
					headerText='New User'
					onLeftPress={() => { this.props.navigation.dispatch(resetAction); }}
					onRightPress={() => { const { navigate } = this.props.navigation; navigate('LoginPage'); }}
					iconName='sign-in'
					iconType='font-awesome'
				/>
				<Text>SignUpPage Page</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: '#fff',
		paddingTop: '5%'
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
});

export { SignUpPage };
