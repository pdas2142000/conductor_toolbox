import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native'
import { Colors } from '../../utils/styles'
import { useNavigation } from '@react-navigation/native'
import { getDeviceType } from 'react-native-device-info'
import { hs, ms } from '../../utils/helpers/Metrics'

let deviceType = getDeviceType()

const ToolsListComponent = ({ Data }) => {

    const Navigation = useNavigation()
    const [IsLandscape, SetIsLandscape] = useState(null)

    useEffect(() => {
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        Dimensions.addEventListener('change', OnChange)
    }, [])

    const OnChange = ({ window }) => {
        if (window.width > window.height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
    }
    
    return (
        <View
            style={[
                IsLandscape
                    ? styles.LsContainer
                    : styles.Container,
            ]}
        >
            <FlatList
                data={Data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={[
                                IsLandscape
                                    ? styles.LsCard
                                    : styles.Card,
                            ]}>
                            <TouchableOpacity
                                style={[
                                    IsLandscape ? styles.LsButtonStyle : styles.ButtonStyle,
                                    null,
                                ]}
                                onPress={() => {
                                    const screenName =
                                        item.count_post === '1'
                                            ? 'ToolListItemScreen'
                                            : 'ToolsListingScreen'
                                        Navigation.navigate(screenName, {
                                        id: item?.id,
                                        type: item?.type,
                                        direct: true,
                                        title: item.print_count
                                    })
                                }}>
                                <Text style={styles.ButtonTextStyle}>{item.print_count}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    LsContainer: {
        flex: 1, 
        paddingVertical: 0, 
        padding: '6%',
    },
    Container: {    
        padding: '6%',
    },
    LsCard: {
        textAlign: 'right', 
        paddingVertical: '2%' 
    },
    Card: {
        flex: 0.9
    },
    ButtonsContainerStyle: {
        padding: '6%',
    },
    ButtonStyle: {
        marginHorizontal: '7.5%',
        marginVertical: '6.5%',
        paddingVertical: '2%',
        paddingHorizontal: hs(13),
        borderRadius: hs(6),
        backgroundColor: Colors.ct_primary,
        justifyContent: 'center',
    },
    LsButtonStyle: {
        marginLeft: 'auto',
        width: '100%',
        paddingVertical: '2%',
        paddingHorizontal: hs(13),
        borderRadius: hs(6),
        backgroundColor: Colors.ct_primary,
        justifyContent: 'center',
    },
    ButtonTextStyle: {
        fontFamily: 'BalooBhaina2-Medium',
        color: '#fff',
        textAlign: 'center',
        fontSize: ms(18),
    },
})

export default ToolsListComponent
