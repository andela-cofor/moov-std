// react libraries
import React from 'react';

// react-native libraries
import { StyleSheet, View, Dimensions } from 'react-native';

// third-party libraries
import { FormValidationMessage } from 'react-native-elements'

// common
import { ButtonTextComponent, Input, StatusBarComponent } from "../common";

const SignupForm =
	({
		 onSubmit,
		 buttonText,
		 iconName,
		 iconType,
		 requester,
		 onChangeFirstNameText,
		 onChangeLastNameText,
		 onChangeEmailText,
		 onChangePasswordText,
		 firstNameValue,
		 lastNameValue,
		 emailValue,
		 passwordValue,
		 errorMessage,
		 onSubmitEditing,
		 autoFocus2,
		 buttonIconName,
		 buttonIconType
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
							label='First Name'
							value={firstNameValue}
							onChangeText={onChangeFirstNameText}
							autoFocus
							placeholder='John'
							errorMessage={errorMessage}
						/>
						<Input
							onSubmitEditing={onSubmitEditing}
							label='Last Name'
							value={lastNameValue}
							onChangeText={onChangeLastNameText}
							placeholder='Doe'
							errorMessage={errorMessage}
						/>
						<Input
							onSubmitEditing={onSubmitEditing}
							label='Email'
							value={emailValue}
							onChangeText={onChangeEmailText}
							keyboardType='email-address'
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

export { SignupForm };
