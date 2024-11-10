/**React Import */
import { StyleSheet } from 'react-native'
import { getDeviceType } from 'react-native-device-info'

let deviceType = getDeviceType()

export default StyleSheet.create({
    IconContainerStyle: {
        paddingVertical: '5%',
        alignItems: 'center'
    },
    ErrorBadgeStyle: {
        textAlign: 'center',
        paddingTop: 18,
        fontFamily: 'BalooBhaina2-Medium',
    }
})