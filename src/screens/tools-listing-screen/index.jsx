/**React Import */
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native'

/**Local Import */
import { deviceType, ms } from '../../utils/helpers/Metrics'
import { Colors } from '../../utils/styles'
import { makeRequest } from '../../utils/make-request'

/**Components */
import AppHeader from '../../components/app-header'

/**Main Export */
const ToolsListingScreen = ({ navigation, route }) => {

    const { id, type, title } = route?.params 
    const IsMountedRef = useRef(null)

    const [Loading, SetLoading] = useState(false)
    const [Data, SetData] = useState([])

    useEffect(() => {
        IsMountedRef.current = true
        if(IsMountedRef.current){
            SetLoading(false)
            GetData(type, id)
        }
    } , [])

    const GetData = async () =>{
        let Response = await makeRequest("POST", "get_content", {}, {type: type, subtype: id}, true)
        SetData(Response.data)
        SetLoading(true)
    }
   
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <AppHeader title={type} willGoBack={true} />
            {
                !Loading ?
                <View style={{flex: 1, justifyContent: "center"}}>
                    <ActivityIndicator size="large" color={Colors.ct_primary} />
                </View> 
                    :
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        <Text style={styles.ScreenTitleStyle}>{title}</Text>
                        <FlatList 
                            data={Data}
                            keyExtractor={ (id, index) => Data[index].id }
                            renderItem={ ({ item, index }) => {
                                return (
                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('ToolListItemScreen', {listItem:item, type:item.type, allData:Data})}
                                        style={{marginHorizontal: ms(15),flex:1}}
                                    >
                                        <View style={styles.ListStyle}>
                                            <View style={styles.ListNumberStyle}>
                                                <Text style={styles.ListNumberTextStyle}>{ index + 1 }</Text>
                                            </View>
                                            <Text style={styles.ListTitleStyle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />   
                    </View>
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: ms(20)
    },
    ScreenTitleStyle: {
        fontSize: ms(23),
        fontFamily: 'BalooBhaina2-Medium',
        color: Colors.ct_primary,
        marginBottom: ms(6),
        marginHorizontal: ms(15),
    },
    ListStyle: {
        flexDirection: 'row',
        alignItems:"center",
        marginVertical: ms(6),
        padding: deviceType === 'Tablet' ? ms(24) : ms(14),
        borderRadius: ms(6),
        backgroundColor: Colors.ct_white,
        shadowOffset: {
			width: ms(0.6),
			height: ms(0.6),
		},
		shadowOpacity: ms(0.1),
		shadowRadius: ms(4.0),
		elevation: ms(1),
    },
    ListNumberStyle: {
        backgroundColor: Colors.ct_primary,        
        marginRight: ms(10),
        height: ms(35),
        width: ms(35),
        borderRadius: ms(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ListNumberTextStyle: {
        fontSize: ms(14),
        fontFamily: 'BalooBhaina2-Bold',
        color: Colors.ct_white,
        alignSelf: 'center',
        paddingTop: ms(2),
    },
    ListTitleStyle: {
        flex: 1,
        fontSize: ms(17),
        color: '#333',
        fontFamily: 'BalooBhaina2-Medium'
    }
})

export default ToolsListingScreen
