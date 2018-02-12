// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';

// third-party libraries
import firebase from "firebase";
import Geocoder from 'react-native-geocoding';

import Mapbox from '@mapbox/react-native-mapbox-gl';
import { Card, Button } from 'react-native-elements';


// common
import { StatusBarComponent} from "../common";

Mapbox.setAccessToken('pk.eyJ1IjoiY2hpbmVkdS1tb292IiwiYSI6ImNqY3k0OHB0bzE5enUyd281cWNrMWhiZzMifQ.v-D-XU5Db6VMf_SXQTaW2A');

Geocoder.setApiKey('AIzaSyCtQUa9LRWMjEUh5KiPk3r5vQhak8SJlCE'); // use a valid API key

class MoovHomepage extends React.Component {
	
	state={
		myDestinationName: '',
		myDestinationLatitude: null,
		myDestinationLongitude: null,
		myLocationLatitude: null,
		myLocationLongitude: null,
		myLocationName: 'My Location',
		price: '',
		requestSlot: 1,
		verifiedUser: false,
		showModal: false,
		showMap: false,
	};
	
	/**
	 * componentDidMount
	 *
	 * React life cycle method
	 * @return {void}
	 */
	componentDidMount() {
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
	
	/**
	 *
	 * @return {*}
	 */
	renderAnnotations () {
		return (
			<Mapbox.PointAnnotation
				key='pointAnnotation'
				id='pointAnnotation'
				coordinate={[this.state.myLocationLongitude, this.state.myLocationLatitude]}>
				
				<View style={styles.annotationContainer}>
					<View style={styles.annotationFill} />
				</View>
				<Mapbox.Callout title='My Location' />
			</Mapbox.PointAnnotation>
		)
	}
	
	render() {
		const { container, activityIndicator } = styles;
		console.log(this.state);
		
		let myCoordinate;
		
		if(this.state.myLocationLatitude) {
			myCoordinate = [this.state.myLocationLongitude, this.state.myLocationLatitude]
		}
		
		// ACTIVITY INDICATOR
		if (this.state.loading) {
			return (
				<View style={{flex: 1}}>
					<StatusBarComponent />
					<ActivityIndicator
						color = '#004a80'
						size = "large"
						style={activityIndicator}
					/>
				</View>
			);
		}
		
		// FETCHING YOUR LOCATION
		if (this.state.verifiedUser && this.state.myLocationLongitude === null) {
			return (
				<View style={{flex: 1,justifyContent: 'center', backgroundColor: 'white'}}>
					<StatusBarComponent />
					<Card
						title='FETCHING YOUR LOCATION'
						image={require('../../assets/my_location.jpg')}>
						<Text style={{marginBottom: 10}}>
							kindly turn on your location and grant location permission to MOOV.
						</Text>
						<View style={{ flexDirection: 'row'}}>
							<ActivityIndicator
								color = '#004a80'
								size = "large"
								style={activityIndicator}
							/>
						</View>
						<Text style={{marginBottom: 10}}>
						</Text>
					</Card>
				</View>
			);
		}
		
		return (
			<View style={styles.container}>
				{/*<Mapbox.MapView*/}
					{/*styleURL={Mapbox.StyleURL.Dark}*/}
					{/*zoomLevel={15}*/}
					{/*centerCoordinate={[3.331647, 6.446987]}*/}
					{/*style={styles.container}*/}
					{/*showUserLocation={true}>*/}
					{/*{this.renderAnnotations()}*/}
				{/*</Mapbox.MapView>*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 20
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15,
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'orange',
		transform: [{ scale: 0.6 }],
	}
});

export { MoovHomepage };