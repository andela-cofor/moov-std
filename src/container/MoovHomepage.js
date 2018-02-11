// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text, Platform, PermissionsAndroid } from 'react-native';

// common
import { StatusBarComponent} from "../common";
import firebase from "firebase";

class MoovHomepage extends React.Component {
	
	state={
		verifiedUser: false,
		myLocationLatitude: null,
		myLocationLongitude: null,
		myLocationName: 'My Location',
		
	};
	
	/**
	 * componentDidMount
	 *
	 * React life cycle method
	 * @return {void}
	 */
	componentDidMount() {
		
		if(Platform.OS === 'ios') {
			this.getMyLocation();
		}
		
		if(Platform.OS === 'android') {
			this.requestLocationPermission()
				.then((response) => {
					console.log(response, 'RESPONSE');
				});
			console.log('Android');
		}
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
		this.isVerified();
	}
	
	/**
	 * requestLocationPermission
	 *
	 * request permission for android users
	 * @return {Promise<void>}
	 */
	async requestLocationPermission () {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					'title': 'MOOV App Location Permission',
					'message': 'MOOV App needs access to your location ' +
					'so you can order a cab.'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the location");
				this.getMyLocation();
			} else {
				console.log("Location permission denied");
				this.requestLocationPermission();
			}
		} catch (err) {
			console.warn(err)
		}
	}
	
	
	/**
	 * getMyLocation
	 *
	 * Get's user location and sets it in the state
	 * @return {void}
	 */
	getMyLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("wokeeey");
				console.log(position);
				this.setState({
					myLocationLatitude: position.coords.latitude,
					myLocationLongitude: position.coords.longitude,
					error: null,
				});
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
		);
	};
	
	/**
	 * login
	 *
	 * Navigate to login page
	 * @return {void}
	 */
	login = () => {
		this.setState({ loading: !this.state.loading });
		const { navigate } = this.props.navigation;
		this.setState({ loading: !this.state.loading });
		navigate('LoginPage');
	};
	
	/**
	 * isVerified
	 *
	 * Check if user's email is verified
	 * @return {void}
	 */
	isVerified = () => {
		const { navigate } = this.props.navigation;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ verifiedUser: true })
			} else {
				navigate('LandingPage');
			}
		});
	};
	
	render() {
		const { container } = styles;
		console.log(this.state);
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<Text>Moov Page</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export { MoovHomepage };