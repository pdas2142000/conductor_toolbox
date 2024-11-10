/** React Import */
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    ScrollView,
} from 'react-native'

/**Library */
import { useIsFocused } from '@react-navigation/native'

/** Local Import */
import { Colors } from '../../utils/styles'
import { makeRequest } from '../../utils/make-request'

/** Components */
import AppHeader from '../../components/app-header'
import ToolsListComponent from '../../components/tools-list'
import ScreenImage from '../../components/screen-image'

/**Styles */
import styles from '../../components/stylesheets/styles'

/** Main Export */
const PianoAndScoreScreen = () => {

    const IsFocused = useIsFocused()

    const [IsLandscape, SetIsLandscape] = useState(null)
    const [Loading, SetLoading] = useState(false)
    const [LogoWidth, SetLogoWidth] = useState(Dimensions.get('window').width)
    const [Data, SetData] = useState(null)

    useEffect(() => {
        // SetLoading(false)
        GetData()
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

    const GetData = async () => {
        let Respone = await makeRequest("POST", "get_cat", {}, { type: 'piano' }, true)
        SetData(Respone.data)
        SetLoading(true)
    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <AppHeader {...{ title: "Piano & Score" }} willGoBack={true} />
            {!Loading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.ct_primary} />
                </View>
            ) : (
                <ScrollView>
                    <ScreenImage
                        {...{
                            IsLandscape,
                            IsFocused,
                            LogoWidth,
                            Url: require('../../../assets/images/piano-lg.png')
                        }}
                    />

                    {Data.length <= 0 ? (
                        <Text style={styles.ErrorBadgeStyle}>No Results Found</Text>
                    ) : (
                        <ToolsListComponent Data={Data} />
                    )}
                </ScrollView>
            )}
        </View>
    )
}

export default PianoAndScoreScreen
