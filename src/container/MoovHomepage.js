// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text, Platform, PermissionsAndroid, ActivityIndicator, Dimensions } from 'react-native';

// third-party libraries
import firebase from "firebase";
import Geocoder from 'react-native-geocoding';
import Modal from 'react-native-simple-modal';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { Card, Button, PricingCard, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown';

// component
import { GooglePlacesInput } from "../component";

// common
import { StatusBarComponent, ButtonTextComponent} from "../common";

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
		showMap: true,
		bulbName: 'ios-bulb',
		bulbType: 'ionicon',
		bulbColor: 'white',
		bulbBackgroundColor: 'black',
		mapColor: Mapbox.StyleURL.Street,
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
				coordinate={[this.state.myDestinationLongitude, this.state.myDestinationLatitude]}>
				
				<View style={styles.annotationContainer}>
					<View style={styles.annotationFill} />
				</View>
				<Mapbox.Callout title='My Location'
				/>
			</Mapbox.PointAnnotation>
		)
	}
	
	/**
	 * toggleMap
	 *
	 * shows map by toggling the showMap state
	 */
	toggleMap = () => {
		this.setState({ showMap: !this.state.showMap })
	};
	
	/**
	 * setUserLocation
	 *
	 * sets user location in the state
	 * @param location
	 * @param locationName
	 */
	setUserLocation = (location, myLocationName) => {
		this.setState({
			myLocationLatitude: location.lat,
			myLocationLongitude: location.lng,
			myLocationName,
		});
	};
	
	/**
	 * setUserDestination
	 *
	 * sets user destination in the state
	 * @param {number} destination
	 * @param {number} destinationName
	 */
	setUserDestination = (destination, myDestinationName) => {
		this.setState({
			myDestinationLatitude: destination.lat,
			myDestinationLongitude: destination.lng,
			myDestinationName,
		});
	};
	
	/**
	 * verifyRoutes
	 *
	 * Verifies user location and destination
	 * @return {void}
	 */
	verifyRoutes = () => {
		if(this.state.myDestinationLatitude !== null) {
			this.getPrice();
			Toast.showWithGravity(
				`${this.state.myDestinationLatitude}`,
				Toast.LONG,
				Toast.TOP,
			);
		} else {
			Toast.showWithGravity(
				`Kindly select a destination`,
				Toast.LONG,
				Toast.TOP,
			);
		}
	};
	
	/**
	 * getDistance
	 *
	 * Calculates the User's distance
	 * @param lat1
	 * @param lon1
	 * @param lat2
	 * @param lon2
	 * @param unit
	 * @return {number}
	 */
	getDistance = (lat1, lon1, lat2, lon2, unit) =>  {
		let radlat1 = Math.PI * lat1/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = lon1-lon2;
		let radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit === "K") { dist = dist * 1.609344 }
		if (unit === "N") { dist = dist * 0.8684 }
		
		return dist * 500
	};
	
	/**
	 * getPrice
	 *
	 * This method gets the distance and calcultes the get Price method
	 * @return {void}
	 */
	getPrice = () => {
		let distance = this.getDistance(
			this.state.myLocationLatitude,
			this.state.myLocationLongitude,
			this.state.myDestinationLatitude,
			this.state.myDestinationLongitude
		);
		
		let price = Math.floor(distance) *  this.state.requestSlot;
		
		// this.setState({ price })
		this.setState({ price, showModal: !this.state.showModal })
	};
	
	/**
	 * toggleMapType
	 *
	 * Toogles the map color works for IOS only
	 * @return {void}
	 */
	toggleMapType = () => {
		if(this.state.bulbBackgroundColor === 'black') {
			this.setState({
				bulbName: 'ios-bulb',
				bulbColor: 'black',
				bulbBackgroundColor: 'white',
				mapColor: Mapbox.StyleURL.Dark,
			})
		}
		
		if(this.state.bulbBackgroundColor === 'white') {
			this.setState({
				bulbName: 'ios-bulb',
				bulbColor: 'white',
				bulbBackgroundColor: 'black',
				mapColor: Mapbox.StyleURL.Street,
			})
		}
	};
	
	render() {
		const { container, activityIndicator } = styles;
		console.log(this.state);
		
		let myDestination, myLocation;
		let { height, width } = Dimensions.get('window');
		let slots = [ { value: '1', }, { value: '2', }, { value: '3', }, { value: '4', } ];
		let priceLog = `₦ ${this.state.price}`;
		
		if(this.state.myLocationLatitude) {
			myDestination = [this.state.myDestinationLongitude, this.state.myDestinationLatitude]
			myLocation = [this.state.myLocationLongitude, this.state.myLocationLatitude]
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
		
		// show mapBox
		if(this.state.showMap) {
			return (
				<View style={styles.container}>
					<Mapbox.MapView
						styleURL={this.state.mapColor}
						zoomLevel={15}
						centerCoordinate={myLocation}
						style={styles.container}
						showUserLocation={true}
					>
						{/*{this.renderAnnotations()}*/}
						{
							(Platform.OS === 'ios')
								?
								<View style={{ marginTop: 20, alignItems: 'flex-end'}}>
									<Icon
										raised
										name={this.state.bulbName}
										type={this.state.bulbType}
										color={this.state.bulbColor}
										containerStyle={{ backgroundColor:  this.state.bulbBackgroundColor }}
										onPress={this.toggleMapType} />
								</View>
								: <View/>
						}
					</Mapbox.MapView>
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
		
		// VERIFIED AND HAS LOCATION
		if(this.state.verifiedUser && this.state.myLocationLongitude !== null) {
			return (
				<View style={{ backgroundColor: '#fff',height: height }}>
					<StatusBarComponent />
					<Modal
						modalStyle={{
							borderRadius: 2,
							margin: 20,
							padding: 10,
							backgroundColor: 'white'
						}}
						offset={this.state.offset}
						open={this.state.showModal}
						// open={true}
						modalDidOpen={() => console.log('modal did open')}
						modalDidClose={() => this.setState({showModal: false})}
						style={{alignItems: 'center'}}>
						<View>
							<PricingCard
								color='#004a80'
								title='Fee'
								price={priceLog}
								// info={['1 User(s)', 'Basic Support', 'All Core Features']}
								info={[
									`${this.state.requestSlot} User(s)`,
									`From ${this.state.myLocationName}`,
									`To ${this.state.myDestinationName} `,
									`Powered by Symple.tech`
								]}
								button={{ title: 'Accept', icon: 'directions-car' }}
								onButtonPress={this.toggleMap}
							/>
						</View>
					</Modal>
					<View style={{ flexDirection: 'column', ...Platform.select({
							ios: {
								marginTop: height / 10
							},
							android: {
								marginTop: height / 25
							},
						}),
						zIndex: -1,
					}}>
						<View style={{ height: height / 4, width: '100%',}}>
							<GooglePlacesInput
								text='Change my location'
								onPress={(data, details = null) => {
									// console.log(data, details)
									this.setUserLocation(details.geometry.location, details.name);
								}}
							/>
						</View>
						<View style={{ height: height / 4, width: '100%'}}>
							<GooglePlacesInput
								text='TO'
								onPress={(data, details = null) => {
									// console.log(data, details)
									this.setUserDestination(details.geometry.location, details.name);
								}}
								text='To'
							/>
						</View>
					</View>
					<View style={{ width: '90%', zIndex: -1, marginLeft: width / 20}}>
						<Dropdown
							label='slots'
							itemColor='blue'
							data={slots}
							value='1'
							onChangeText={requestSlot => this.setState({requestSlot })}
						/>
					</View>
					<View style={{ zIndex: -1, marginTop: 10 }}>
						<ButtonTextComponent
							onPress={this.verifyRoutes}
							buttonText='MOOV'
							iconName='fast-forward'
							iconType='foundation'
							backgroundColor='#004a80'
						/>
					</View>
				</View>
			)
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