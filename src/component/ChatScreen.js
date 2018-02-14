// react library
import React, { Component } from 'react';

// react-native libraries
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';

// third-party libraries
import { Header, Card, ListItem } from 'react-native-elements';

class ChatScreen extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			selectedChat: '',
			userId: '',
		}
	}
	
	
	componentDidMount() {
		const selectedChat = this.props.navigation.state.params.selectedChat;
		const userId = this.props.navigation.state.params.userId;
		
		this.setState({ selectedChat, userId });
	}
	
	render() {
		const { navigate } = this.props.navigation;
		const { container, activityIndicator, button, buttonText } =  styles;
		
		if (this.state.isLoading ) {
			return (
				<View style={{flex: 1}}>
					<ActivityIndicator
						color = 'blue'
						size = "large"
						style={activityIndicator}
					/>
				</View>
			);
		}
		
		return (
			<View style={container}>
				<Header
					backgroundColor='#004a80'
					// leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: this.state.selectedChat, style: { color: '#fff' } }}
					// rightComponent={{ icon: 'home', color: '#fff' }}
				/>
				<Text>Selected Chat: {this.state.selectedChat}</Text>
				<Text>UserId: {this.state.userId}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
	button: {
		marginBottom: 30,
		width: '50%',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	buttonText: {
		padding: 20,
		color: 'black'
	}
});

export { ChatScreen };
