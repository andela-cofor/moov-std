// react libraries
import React from 'react';

// third-party libraries
import { Header } from 'react-native-elements';

const HeaderComponent = ({
													 headerText,
													 onLeftPress,
													 onRightPress,
													 iconName,
													 iconType,
													 backgroundColor,
													 leftIconColor,
													 rightIconColor,
	                         centerTextColor
}) => {
	
	return (
		<Header
			backgroundColor={backgroundColor}
			// backgroundColor='#004a80'
			leftComponent={{
				icon: 'home', color: leftIconColor, onPress: onLeftPress,
			}}
			centerComponent={{ text: headerText, style: { color: centerTextColor } }}
			rightComponent={{
				icon: iconName, color: rightIconColor, type: iconType, onPress: onRightPress
			}}
		/>
	)
};

export { HeaderComponent };