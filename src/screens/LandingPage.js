// react libraries
import React from 'react';

// react-native libraries
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Animated } from 'react-native';

// third-party librariesß
import firebase from 'firebase';

// commom
import { StatusBarComponent } from "../common";

class LandingPage extends React.Component {
	/**
	 * constructor
	 */
	constructor () {
		super();
		this.springValue = new Animated.Value(0.3);
	}
	
	/**
	 * componentWillMount
	 *
	 * React life-cycle method initialize firebase app
	 * @return {void}
	 */
	componentWillMount() {
		// if (firebase.apps.length === 0) {
		// 	firebase.initializeApp({
		// 		apiKey: "AIzaSyD0ZJS7tPUrOWkZEZQRXDLQfLRT2yxhKMM",
		// 		authDomain: "moov-68c37.firebaseapp.com",
		// 		databaseURL: "https://moov-68c37.firebaseio.com",
		// 		projectId: "moov-68c37",
		// 		storageBucket: "moov-68c37.appspot.com",
		// 		messagingSenderId: "1050975255216"
		// 	});
		// }
	}
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method
	 * @return {void}
	 */
	componentDidMount() {
		this.spring();
	}
	
	/**
	 * spring
	 *
	 * Animates app icon
	 * @returns {void}
	 */
	spring = () => {
		this.springValue.setValue(0.1);
		Animated.spring(
			this.springValue,
			{
				toValue: 1,
				friction: 1
			}
		).start()
	};
	
	/**
	 * appNavigation
	 *
	 * @param {string} page - The page the user wants to navigate to
	 * @return {void}
	 */
	appNavigation = (page) => {
		const { navigate } = this.props.navigation;
		
		if (page === 'signup') {
			navigate('SignUpPage');
		}
		
		if (page === 'login') {
			navigate('LoginPage');
		}
	};
	
	render() {
		const { container, landingPageBody, landingPageBodyText } = styles;
		let { height, width } = Dimensions.get('window');
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<View style={{ alignItems: 'center'}}>
					<TouchableOpacity onPress={this.spring.bind(this)}>
						<Animated.Image
							style={{
								alignItems: 'center',
								height: height / 3.5,
								width: width / 2,
								transform: [{scale: this.springValue}]
							}}
							source={require('../../assets/appLogo.png')}
						/>
					</TouchableOpacity>
				</View>
				<View style={landingPageBody}>
					<TouchableOpacity onPress={() => this.appNavigation('signup')}>
						<Text style={landingPageBodyText} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.appNavigation('login')}>
						<Text style={landingPageBodyText} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>Log In</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#004a80',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
	},
	landingPageBody: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: '20%',
	},
	landingPageBodyText: {
		color: 'white',
		fontSize: 20,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 15,
		padding: 8,
		overflow: 'hidden',
	}
});

export { LandingPage };
