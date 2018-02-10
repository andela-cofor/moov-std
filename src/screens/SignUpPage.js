// react libraries
import React from 'react';

// react-native libraries
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Animated } from 'react-native';

// commom
import { StatusBarComponent } from "../common";

class SignUpPage extends React.Component {
	constructor () {
		super();
	}
	
	render() {
		const { container } = styles;
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<Text>SignUpPage Page</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#004a80',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export { SignUpPage };
