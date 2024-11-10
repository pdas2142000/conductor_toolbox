/** React Import */
import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native'

/** Library */
import { getDeviceType, getVersion } from 'react-native-device-info'

/** Local Import */
import { Colors, Fonts } from '../../utils/styles'
import { ms } from '../../utils/helpers/Metrics'

let deviceType = getDeviceType()
let version = getVersion()

/** Main Export */
const HomeScreen = ({ navigation }) => {

    const [IsLandscape, SetIsLandscape] = useState(null)
    const [LogoWidth, SetLogoWidth] = useState(Dimensions.get('window').width)

    useEffect(() => {
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false) 
        }
        Dimensions.addEventListener('change', onChange)
    }, [])

    const onChange = ({ window }) => {
        if (window.width > window.height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        SetLogoWidth(window.width)
    }
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors.ct_primary }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.ct_primary} />
            </SafeAreaView>

            <View style={[
                styles.ct_home_area,
                IsLandscape ? { paddingTop: 0 } : { paddingTop: '5%' },
            ]}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: IsLandscape ? null : 1}} >
                    <View
                        style={[
                            styles.ct_logo_box_style,
                            IsLandscape ? { alignItems: "center" } : null,
                        ]}
                    >
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={[
                                IsLandscape
                                    ? { height: LogoWidth * 0.3, width: LogoWidth * 0.3 }
                                    : { height: LogoWidth * 0.45, width: LogoWidth * 0.45 },
                                !IsLandscape && deviceType === 'Tablet'
                                    ? { height: LogoWidth * 0.3, width: LogoWidth * 0.3 }
                                    : null,
                            ]}
                            resizeMode="contain"
                        />
                        {IsLandscape ? (
                            <Text style={[styles.ct_version_text_style, { paddingTop: 10 }]}>
                                Version {version || '1.3'}
                            </Text>
                        ) : null}
                    </View>
                    <View style={[IsLandscape ? styles.ct_ls_container_style : styles.ct_container_style]}>
                        {
                            HomeData.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[IsLandscape ? styles.ct_ls_containerBox : styles.ct_containerBox]} >
                                        <TouchableOpacity
                                            style={styles.ct_button_style}
                                            onPress={() => navigation.navigate('Main', { screen: item.Nav })}
                                        >
                                            <Text style={styles.ct_box_text_style}>{item.Text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                    </View>
                    {IsLandscape ? null : (
                        <Text style={styles.ct_version_text_style}>Version {version || '1.3'}</Text>
                    )}
                </ScrollView>
            </View>

        </> 
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    ct_container_style: {
        padding: '6%',
        flex: 0.9,
        justifyContent: "space-between",

    },
    ct_home_area: {
        flex: 1,
    },
    ct_ls_container_style: {
        flex: 1,
    },
    LsBox: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    ct_logo_box_style: {
        paddingVertical: deviceType === 'Tablet' ? 0 : '2%',
        alignItems: 'center',
    },
    ct_containerBox: {
        marginHorizontal: '7.5%',
        marginVertical: deviceType === 'Tablet' ? '2.5%' : '5.5%',
        paddingVertical: '2%',
        paddingHorizontal: ms(14),
        borderRadius: ms(6),
        shadowOffset: {
            width: ms(4),
            height: ms(4),
        },
        shadowOpacity: ms(0.05),
        shadowRadius: ms(3),
        elevation: ms(2),
        backgroundColor: Colors.ct_primary,
        justifyContent: 'center',
    },
    ct_ls_containerBox: {
        marginHorizontal: '5%',
        marginVertical: deviceType === 'Tablelet' ? '2.5%' : '2.9%',
        paddingVertical: '1%',
        paddingHorizontal: ms(10),
        borderRadius: ms(6),
        shadowOffset: {
            width: ms(4),
            height: ms(4),
        },
        shadowOpacity: ms(0.15),
        shadowRadius: ms(3),
        elevation: ms(2),
        backgroundColor: Colors.ct_primary,
        justifyContent: 'center',
    },
    ct_button_style: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ct_box_text_style: {
        fontFamily: Fonts.Font_300,
        color: Colors.ct_white,
        textAlign: 'center',
        fontSize: ms(18),
        paddingTop: 5,
    },
    ct_version_text_style: {
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.65)',
        fontFamily: Fonts.Font_300,
        fontSize: ms(16),
    },
})

const HomeData = [
    {
        Text: "Introduction",
        Nav: "introduction"
    },
    {
        Text: "Conducting",
        Nav: "conducting"
    },
    {
        Text: "Methodology",
        Nav: "methodology"
    },
    {
        Text: "Piano & Score",
        Nav: "piano&Score"
    },
]