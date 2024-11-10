/** React Import */
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

/** Library */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

/** Components */
import IntroScreen from '../../screens/introduction-screen'
import CustomTabNavigation from './custom-tab-navigation'
import { getDeviceType } from 'react-native-device-info'

/**Icon */
import ConductingBottomIcon from '../../../assets/svgs/conducting.svg'
import ConductingLgtBottomIcon from '../../../assets/svgs/conducting-lgt.svg'
import MethodologyBottomIcon from '../../../assets/svgs/methodology.svg'
import MethodologyLgtBottomIcon from '../../../assets/svgs/methodology-lgt.svg'
import InfoBottomIcon from '../../../assets/svgs/info.svg'
import InfoLgtBottomIcon from '../../../assets/svgs/info-lgt.svg'
import PianoBottomIcon from '../../../assets/svgs/piano.svg'
import PianoLgtBottomIcon from '../../../assets/svgs/piano-lgt.svg'
 
/** Local Import */
import { ConductingStackNav, MethodologyStackNav, PianoStackNav } from '../stack-navigation'

let deviceType = getDeviceType()
const Tab = createBottomTabNavigator()

/** Main Export */
const BottomNavigation = ({route}) => {
    const { screen } = route?.params;
console.log(screen)
    const [IsLandscape, SetIsLandscape] = useState(null)

    useEffect(() => {
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        Dimensions.addEventListener("change", OnChange)
        return () => {
       
        }
    }, [])

    const OnChange = ({ window }) => {
        if (window.width > window.height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
    }

    return (
        <Tab.Navigator
            tabBar={props => <CustomTabNavigation {...props} />}
            initialRouteName={screen}
            screenOptions={{
                headerShown: false,
                style: {
                    paddingVertical: IsLandscape ? 0 : 15,
                    height: IsLandscape & deviceType === 'Handset' ? 55 : Platform.OS === 'ios' ? 65 : 55,
                    
                },
            }} 
        >
            <Tab.Screen
                name='conducting'
                component={ConductingStackNav}
                options={{
                    title: 'Home',
                    tabBarLabel: "Conducting",
                    tabBarIcon: ({ isFocused }) => {
                        var Icon = ConductingBottomIcon
                        var InActiveIcon = ConductingLgtBottomIcon
                        return (
                            <>
                                {
                                    isFocused ?
                                        <Icon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30} />
                                        :
                                        <InActiveIcon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30}/>

                                }
                            </>
                        )
                    }
                }}
            />
            <Tab.Screen
                name='methodology'
                component={MethodologyStackNav}
                options={{
                    tabBarLabel: "Methodology",
                    tabBarIcon: ({ isFocused }) => {
                        var Icon = MethodologyBottomIcon
                        var InActiveIcon = MethodologyLgtBottomIcon
                        return (
                            isFocused ?
                                <Icon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30}/>
                                :
                                <InActiveIcon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30} />
                        )
                    }
                }}
            /> 
            <Tab.Screen
                name='piano&Score'
                component={PianoStackNav}
                options={{
                    tabBarLabel: "Piano & Score",
                    tabBarIcon: ({ isFocused }) => {
                        var Icon = PianoBottomIcon 
                        var InActiveIcon = PianoLgtBottomIcon
                        return (
                            isFocused ?
                                <Icon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30} />
                                :
                                <InActiveIcon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='introduction'
                component={IntroScreen}
                options={{
                    tabBarLabel: "Introduction",
                    tabBarIcon: ({ isFocused }) => {
                        var Icon = InfoBottomIcon
                        var InActiveIcon = InfoLgtBottomIcon
                        return (
                            isFocused ?
                                <Icon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30}/>
                                :
                                <InActiveIcon width={Platform.OS === 'ios' ? 40 : 30} height={Platform.OS === 'ios' ? 40 : 30}/>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})