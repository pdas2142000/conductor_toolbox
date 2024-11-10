/** React Import */
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native'

/**Icon */
import BackArrowIcon from '../../../assets/svgs/arrow-small-left.svg'

/** Library */
import { useNavigation } from '@react-navigation/native'

/** Local Import */
import { IconProps } from '../../utils/helpers/icon-props'
import { ms } from '../../utils/helpers/Metrics'
import { Colors, Fonts } from '../../utils/styles'

/** Main Export */
const AppHeader = ({ title, willGoBack, popBack }) => {

    const Navigation = useNavigation()
    
    const HandleGoBack = () => {
        if (popBack) {
            Navigation.pop()
        } else {
            Navigation.pop()
        }
    };
    return (
        <View style={styles.ct_custom_header_style}>
            <SafeAreaView style={{ backgroundColor: Colors.ct_primary }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.ct_primary} />
            </SafeAreaView>
            <View style={styles.ct_es_header_content}>
                {willGoBack ? (
                    <View style={styles.ct_back_button_wrap_style}>
                        <TouchableOpacity
                            style={styles.ct_back_button_style}
                            onPress={HandleGoBack}>
                            <BackArrowIcon {...IconProps(ms(24))} fill={Colors.ct_white} />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <Text style={styles.ct_header_text_style}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ct_custom_header_style: {
        backgroundColor: '#102e64',
    },
    ct_es_header_content: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
    },
    ct_header_text_style: {
        fontSize: ms(20),
        fontFamily: Fonts.Font_300,
        color: '#fff',
        textTransform: 'capitalize',
    },
    ct_back_button_wrap_style: {
        position: 'absolute',
        left: 0,
       
    },
    ct_back_button_style: {
        height: 65,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default AppHeader
