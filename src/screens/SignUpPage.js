// react libraries
import React from 'react';

// react-native libraries
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
}from 'react-native';

// third-part libraries
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import * as axios from 'axios';

// component
import { SignupForm } from "../component";

// commom
import { StatusBarComponent, HeaderComponent } from "../common";

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
	
	/**
	 *
	 */
	onSubmitEditing = () => {
		console.log(this.state, 'I was called');
	};
	
	/**
	 * onSignuSuccess
	 *
	 * sends user details to pa
	 * @param {object} user - returned user object from firebase
	 */
	onFirebaseSuccess = (user) => {
		const { navigate } = this.props.navigation;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				if (user && user.emailVerified === false) {
					user.sendEmailVerification()
						.then((response) => {
							console.log(response);
							this.setState({ loading: !this.state.loading });
							navigate('MoovPages');
						})
						.catch((error) => {
							this.setState({
								errorMessage: error.message,
								loading: !this.state.loading
							})
						})
				}
			}
		});
	};
	
	/**
	 * saveUserToServer
	 *
	 * Saves user using axios to the server
	 * @return {void}
	 */
	saveUserToServer = () => {
		this.setState({ loading: !this.state.loading });
		axios.post('https://mov-backend.herokuapp.com/api/v1/signup', {
			"firstname": this.state.firstName,
			"lastname": this.state.lastName,
			"email": this.state.email,
		})
			.then(this.createUserOnFirebase)
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.data);
				console.log(error.message);
				this.setState({
					errorMessage: error.response.data.data.message,
					loading: !this.state.loading
				})
			});
	};
	
	/**
	 * createUserOnFirebase
	 */
	createUserOnFirebase = () => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(this.onFirebaseSuccess)
			.catch((error) => {
				this.setState({
					errorMessage: error.message,
					loading: !this.state.loading
				})
			})
	}
	
	/**
	 * onSubmit
	 */
	onSubmit = () => {
		let hasNumber = /\d/;
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		
		if(this.state.firstName.length < 1) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'First Name field cannot be empty' })
		}
		
		if(hasNumber.test(this.state.firstName)) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'First Name field cannot contains numbers' })
		}
		
		if(this.state.lastName.length < 1) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'Last Name field cannot be empty' })
		}
		
		if(hasNumber.test(this.state.lastName)) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'Last Name field cannot contains numbers' })
		}
		
		if(this.state.password.length < 6) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'Password cannot be less than 6 characters' })
		}
		
		if(this.state.email.match(pattern) === null) {
			// this.setState({ loading: !this.state.loading });
			this.setState({ errorMessage: 'Email address is badly formatted' })
		}
		
		if(this.state.email.match(pattern) !== null) {
			if(this.state.firstName.length >= 1 && this.state.lastName.length >= 1) {
				if(hasNumber.test(this.state.firstName) === false && hasNumber.test(this.state.firstName) === false) {
					this.saveUserToServer();
				}
			}
		}
	};
	
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
			<View>
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
				<View style={container}>
					<SignupForm
						onSubmitEditing={this.onSubmitEditing}
						firstName={this.state.firstName}
						lastNameValue={this.state.lastName}
						emailValue={this.state.email}
						passwordValue={this.state.password}
						errorMessage={this.state.errorMessage}
						onChangeFirstNameText={firstName => this.setState({ firstName })}
						onChangeLastNameText={lastName => this.setState({ lastName })}
						onChangeEmailText={email => this.setState({ email })}
						onChangePasswordText={password => this.setState({ password })}
						onSubmit={() => this.onSubmit()}
						buttonIconName='md-person-add'
						buttonIconType='ionicon'
						buttonText='Sign Up'
						autoFocus2={this.state.autoFocus}
					/>
				</View>
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
