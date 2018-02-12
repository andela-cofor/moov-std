// react libraries
import React from 'react';

// react-native libraries
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// component
import { LoginForm } from "../component";

// commom
import { StatusBarComponent, HeaderComponent } from "../common";
import firebase from "firebase";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			loading: false
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
	 * onSubmit
	 *
	 * Submits form to firebase database
	 * @return {void}
	 */
	onSubmit = () => {
		this.setState({ loading: !this.state.loading, errorMessage: '' });
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(this.onLoginSuccess)
			.catch((error) => {
				this.setState({ errorMessage: error.message, loading: !this.state.loading })
			});
	};
	
	/**
	 * onLoginSuccess
	 *
	 * Navigates user to MoovPage
	 * @return {void}
	 */
	onLoginSuccess = () => {
		const { navigate } = this.props.navigation;
		console.log('Success');
		this.setState({ loading: !this.state.loading });
		navigate('MoovPages');
	};
	
	render() {
		const { container, activityIndicator } = styles;
		
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
		
		return (
			<View>
				<StatusBarComponent />
				<HeaderComponent
					headerText='Existing User'
					backgroundColor='#004a80'
					leftIconColor='#fff'
					rightIconColor='#fff'
					centerTextColor='#fff'
					onleftPress={() => { this.props.navigation.dispatch(resetAction); }}
					onRightPress={() => { const { navigate } = this.props.navigation; navigate('SignupPage'); }}
					iconName ='md-person-add'
					iconType ='ionicon'
				/>
				<View style={container}>
					<LoginForm
						emailValue={this.state.email}
						errorMessage={this.state.errorMessage}
						onChangeEmailText={email => this.setState({ email })}
						passwordValue={this.state.password}
						onChangePasswordText={password => this.setState({ password })}
						onSubmit={() => this.onSubmit()}
						buttonIconName='login'
						buttonIconType='entypo'
						buttonText='Login'
						requester='Login'
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

export { LoginPage };
