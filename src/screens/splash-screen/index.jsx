/** React Import */
import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

/** Local Import */
import { Colors, Fonts } from '../../utils/styles'
import { ms } from '../../utils/helpers/Metrics'

/** Library */
import { useNavigation } from '@react-navigation/native'

/** Main Export */
const SplashScreen = () => {

    const Navigation = useNavigation()

	useEffect(() => {
		const timeOut = setTimeout(() => {
			Navigation.replace("home")
		}, 1500)
		return () => clearTimeout(timeOut)
	}, [Navigation])

    return (
		<View style={styles.ct_splash_area}>
			<View style={styles.ct_fixed_icon_style}>
				<Image
					source={require('../../../assets/images/logo.png')}
					style={styles.ct_splash_icon_style}
					resizeMode="contain"
				/>
			</View>
			<Text style={styles.ct_bottom_text_style}>
				POP & JAZZ{'\n'}
				CHOIR LEADING
			</Text>
		</View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
	ct_splash_area: {
		backgroundColor: Colors.ct_white,
		height: "100%",
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	ct_fixed_icon_style: {
		position: 'absolute',
		inset: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: ms(106)
	},
	ct_splash_icon_style: {
		maxWidth: '60%',
		width: ms(200),
		height: ms(200)
	},
	ct_bottom_text_style: {
		padding: ms(30),
		fontSize: ms(18),
		lineHeight: ms(23),
		color: Colors.ct_primary,
		fontFamily: Fonts.Font_Medium_500,
		letterSpacing: ms(3),
		textAlign: 'center'
	}
})