// react library
import React, { Component } from 'react';

// third-party react library
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	TouchableHighlight,
	Image,
} from 'react-native';

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
		justifyContent: 'center',
		alignItems: 'center',
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
