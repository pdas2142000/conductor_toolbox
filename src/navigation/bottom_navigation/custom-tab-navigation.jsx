/** React Import */
import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

/** Local Import */
import { ms } from '../../utils/helpers/Metrics'
import { Colors, Fonts } from '../../utils/styles'

/** Main Export */
const CustomTabNavigation = ({ state, descriptors, navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.ct_bottom_tab_area}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name
                    const icon = options.tabBaIcon ? options.tabBarIcon : null
                    const isFocused = state.index === index
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true })
                        }
                    }
                    return (
                        <View style={[styles.ct_tabs_area]} key={route.key}>
                            <TouchableOpacity
                                onPress={onPress}
                                style={[styles.ct_tab_box, isFocused ? styles.bgs : null]}
                            >
                                {options.tabBarIcon && (<options.tabBarIcon isFocused={isFocused} />)}
                                <Text style={styles.ct_tab_title}>{label}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

export default CustomTabNavigation

const styles = StyleSheet.create({
    ct_bottom_tab_area: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: ms(8),
    },
    ct_tab_box: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    ct_tab_title: {
        fontSize: ms(9),
        paddingBottom: ms(4),
        paddingTop: ms(7),
        color: Colors.ct_primary,
        fontFamily: Fonts.Font_600,
    },
})
