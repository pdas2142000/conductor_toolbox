/** React Import */
import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    ScrollView, 
    Image,  
    Dimensions 
} from 'react-native'

/** Components */
import AppHeader from '../../components/app-header'
import ToolsListComponent from '../../components/tools-list'
import { makeRequest } from '../../utils/make-request'

/** Local Import */
import { Colors } from '../../utils/styles'
 
/** Library */
import { useIsFocused } from '@react-navigation/native'
import { getDeviceType } from 'react-native-device-info'
import ScreenImage from '../../components/screen-image'

/**Styles */
import styles from '../../components/stylesheets/styles'

let deviceType = getDeviceType()

/** Main Export */
const ConductingScreen = () => {
    
    const [Data, SetData] = useState([])
    const [IsLandscape, SetIsLandscape] = useState(null)
    const [LogoWidth, SetLogoWidth] = useState(Dimensions.get('window').width)
    const [Loading, SetLoading]=useState(false)

    const IsFocused = useIsFocused()

    const GetData = async () => {
        const Respopnse = await makeRequest("POST", "get_cat", {}, { type: 'conducting' }, true)
        SetData(Respopnse.data)
        SetLoading(true)
    }

    useEffect(() => {
        GetData()
        // SetLoading(false)
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        Dimensions.addEventListener('change', OnChange)
    }, [IsFocused])

    const OnChange = ({ window }) => {
        if (window.width > window.height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        SetLogoWidth(window.width)
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <AppHeader   {...{title: "Conducting"  }} willGoBack={true} />
                {
                    !Loading  ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={Colors.ct_primary} />
                        </View>)
                    :
                    (
                        <ScrollView>
                            <ScreenImage 
                                {...{
                                    IsLandscape, 
                                    IsFocused, 
                                    LogoWidth,
                                    Url:require('../../../assets/images/conducting-lg.png')
                                }}
                            />
                            {Data?.length <= 0 ? (
                                <Text style={styles.ErrorBadgeStyle}>No Results Found</Text>
                            ) : (
                                <ToolsListComponent Data={Data} />
                            )}
                        </ScrollView>
                    )   
                }
        </View>
    )
}

export default ConductingScreen