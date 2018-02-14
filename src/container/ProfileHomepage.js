// react library
import React from 'react';

// react-native library
import {StyleSheet, View, Text, ImageBackground, Image, Dimensions, Platform, TouchableOpacity} from 'react-native';

// third-party libraries
import { Avatar, Card, ListItem, Button } from 'react-native-elements'
import firebase from "firebase";

// common
import { StatusBarComponent } from "../common";

class ProfileHomepage extends React.Component {
	
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
	
	render() {
		let { height, width } = Dimensions.get('window');
		
		const { container } = styles;
		
		return (
			<View style={container}>
				<StatusBarComponent style={{ height: (Platform.OS === 'ios') ? 60 : 0 }} />
				<View>
					<View style={{ height: height / 2.5, backgroundColor: '#004a80', marginTop: (Platform.OS === 'ios') ? 20 : 0 }}>
						<ImageBackground
							style={{width: width, height: '100%'}}
							blurRadius={2}
							opacity={0.9}
							source={{uri: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAMABADGAAwAAQAAAAAAAAnZAAAAJDExOGE5NWVlLTA3MWMtNDk2Ni1iOTdlLTU0NjZmOWM2YTEyMQ.jpg'}}
						>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<Avatar
									xlarge
									rounded
									source={{uri: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAMABADGAAwAAQAAAAAAAAnZAAAAJDExOGE5NWVlLTA3MWMtNDk2Ni1iOTdlLTU0NjZmOWM2YTEyMQ.jpg'}}
									onPress={() => console.log("Works!")}
									activeOpacity={0.7}
								/>
								{/*<Image*/}
								{/*style={{height: 200, borderRadius: 100, width: 200, opacity: 1}}*/}
								{/*source={{uri: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAMABADGAAwAAQAAAAAAAAnZAAAAJDExOGE5NWVlLTA3MWMtNDk2Ni1iOTdlLTU0NjZmOWM2YTEyMQ.jpg'}}*/}
								{/*/>*/}
							</View>
						</ImageBackground>
					</View>
					<View style={{ height: height / 2.5}}>
						<Card title="DETAILS">
							<Card containerStyle={{padding: 0}} >
								<TouchableOpacity
									onPress={() => {
										const { navigate } = this.props.navigation;
										navigate('BasicInformation');
									}}
								>
									<ListItem
										roundAvatar
										title='Basic Information'
										// avatar='https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
									/>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{padding: 0}} >
								<TouchableOpacity
									onPress={() => {
										const { navigate } = this.props.navigation;
										navigate('NotificationsPage');
									}}
								>
									<ListItem
										roundAvatar
										title='Notifications'
										// avatar='https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
									/>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{padding: 0}} >
								<TouchableOpacity
									onPress={() => {
										const { navigate } = this.props.navigation;
										navigate('TransactionsPage');
									}}
								>
									<ListItem
										roundAvatar
										title='Transaction Details'
										// avatar='https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
									/>
								</TouchableOpacity>
							</Card>
						</Card>
					</View>
					{/*<View style={{ height: '30%'}}>*/}
					{/*<Text>3</Text>*/}
					{/*</View>*/}
				</View>
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
		height: '100%'
	},
});

export { ProfileHomepage };