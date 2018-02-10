// react libraries
import React from 'react';

// react-native libraries
import { View } from 'react-native';

// third-party libraries
import { FormLabel, FormInput } from 'react-native-elements'

const Input = ({ onChangeText, value, errorMessage, autoFocus, secureTextEntry, keyboardType, placeholder, label, onSubmitEditing }) => {
	
	return (
		<View>
			<FormLabel>{label}</FormLabel>
			<FormInput
				hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}
				onChangeText={onChangeText}
				value={value}
				keyboardAppearance="light"
				placeholder={placeholder}
				autoFocus={autoFocus}
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType={keyboardType}
				returnKeyType="next"
				onSubmitEditing={onSubmitEditing}
				blurOnSubmit={false}
				secureTextEntry={secureTextEntry}
				underlineColorAndroid="#c5cdd5"
			/>
		</View>
	)
};

export { Input };
