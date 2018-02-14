// react library
import React from 'react';

// react-native library
import {StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';

// third-party libraries
import { Header, Card, ListItem } from 'react-native-elements';

// common
import { StatusBarComponent} from "../common";
import firebase from "firebase";

class AskHomepage extends React.Component {
	
	state={
		verifiedUser: false,
		selectedChat: '',
		userId: '',
		email: ''
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
	}
	
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
				this.setState({ verifiedUser: true, userId: user.uid, email: user.email });
				console.log(user.uid, 'fudoljfnbldljnf')
			} else {
				navigate('LandingPage');
			}
		});
	};
	
	/**
	 * chatNavigator
	 *
	 * Opens up chat screen.
	 * @return {void}
	 */
	chatNavigator = (chatName) => {
		// alert(chatName)
		const { navigate } = this.props.navigation;
		console.log(this.state, 'sdjs')
		
		navigate('ChatScreen', {
			selectedChat: chatName,
			userId: this.state.userId,
		})
	};
	
	render() {
		const { container, activityIndicator } = styles;
		
		// let { height, width } = Dimensions.get('window');
		
		const users = [
			{
				name: 'brynn',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
			},
			{
				name: 'kfriedson',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'
			},
			{
				name: 'ladylexy',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
			},
			{
				name: 'adhamdannaway',
				avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
			},
		];
		
		if (this.state.isLoading || this.state.userId === '') {
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
				<Header
					backgroundColor='#004a80'
					// leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'Typically replies in under 2h', style: { color: '#fff' } }}
					// rightComponent={{ icon: 'home', color: '#fff' }}
				/>
				
				<Card containerStyle={{padding: 0}} >
					{
						users.map((u, i) => {
							return (
								<TouchableOpacity
									key={i}
									onPress={() => this.chatNavigator(u.name)}
								>
									<ListItem
										roundAvatar
										title={u.name}
										avatar={{uri:u.avatar}}
									/>
								</TouchableOpacity>
							);
						})
					}
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
});

export { AskHomepage };