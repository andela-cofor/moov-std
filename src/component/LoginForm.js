// react libraries
import React from 'react';

// react-native libraries
import { StyleSheet, View, Dimensions } from 'react-native';

// third-party libraries
import { FormValidationMessage } from 'react-native-elements'

// common
import { ButtonTextComponent, Input, StatusBarComponent } from "../common";

const LoginForm =
	({
     onSubmit,
     buttonText,
     iconName,
     iconType,
     requester,
     emailValue,
     onChangeEmailText,
     passwordValue,
     onChangePasswordText,
		 errorMessage,
		 onSubmitEditing,
		 autoFocus2,
	}) => {
	const { container, form } = styles;
	let { height, width } = Dimensions.get('window');
	
	return (
		<View style={container}>
			<StatusBarComponent />
			<View style={{ flexDirection: 'column', width: width / 1 }}>
				<View>
					<Input
						onSubmitEditing={onSubmitEditing}
						label='Email'
						value={emailValue}
						onChangeText={onChangeEmailText}
						keyboardType='email-address'
						autoFocus
						placeholder='name@example.com'
						errorMessage={errorMessage}
					/>
					<Input
						label='Password'
						secureTextEntry={true}
						placeholder='***************'
						value={passwordValue}
						onChangeText={onChangePasswordText}
						errorMessage={errorMessage}
						autoFocus={(autoFocus2) || autoFocus2}
					/>
					<FormValidationMessage>
						{errorMessage}
					</FormValidationMessage>
				</View>
				<View style={{ marginTop: height / 20 }}>
					<ButtonTextComponent
						onPress={onSubmit}
						buttonText={buttonText}
						iconName={iconName}
						iconType={iconType}
						backgroundColor='#004a80'
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	},
	form: {
		flexDirection: 'column',
		width: '50%'
	}
	
});

export { LoginForm };
