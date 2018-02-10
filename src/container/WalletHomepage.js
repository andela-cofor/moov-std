// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text } from 'react-native';

// third-party libraries
import firebase from "firebase";
import { Card, Button } from 'react-native-elements';
import RNPaystack from 'react-native-paystack';

// common
import { StatusBarComponent} from "../common";

class WalletHomepage extends React.Component {
	
	state={
		verifiedUser: false,
	};
	
	/**
	 * componentDidMount
	 *
	 * React life cycle method
	 * @return {void}
	 */
	componentDidMount() {
		// this.isVerified();
		this.chargeCard();
	}
	
	chargeCard() {
		
		RNPaystack.chargeCard({
			cardNumber: '4123450131001381',
			expiryMonth: '10',
			expiryYear: '22',
			cvc: '883',
			email: 'oforchinedu12@gmail.com',
			amountInKobo: 150000,
			// subAccount: 'ACCT_pz61jjjsslnx1d9',
		})
			.then(response => {
				console.log(response); // card charged successfully, get reference here
			})
			.catch(error => {
				console.log(error); // error is a javascript Error object
				console.log(error.message);
				console.log(error.code);
			})
		
	}
	
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
	 * signUp
	 *
	 * Navigate to sign-up page
	 * @return {void}
	 */
	signUp = () => {
		this.setState({ loading: !this.state.loading });
		const { navigate } = this.props.navigation;
		this.setState({ loading: !this.state.loading });
		navigate('SignupPage');
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
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<Text>Wallet Page</Text>
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

export { WalletHomepage };