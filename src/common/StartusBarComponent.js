// react libraries
import React from 'react';

// react-native libraries
import { StatusBar } from 'react-native'

const StatusBarComponent = () => {
	return (
		<StatusBar
			backgroundColor="#004a80"
			// barStyle="light-content"
			// barStyle = "dark-content"
			hidden = {false}
		/>
	)
}

export { StatusBarComponent };
