// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text } from 'react-native';

// common
import { StatusBarComponent} from "../common";
import firebase from "firebase";
import { Card, Button } from 'react-native-elements';

class AskHomepage extends React.Component {
	
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
				<Text>Ask Page</Text>
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

export { AskHomepage };