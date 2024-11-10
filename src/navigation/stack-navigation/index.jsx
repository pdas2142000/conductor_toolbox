/** Library */
import { createStackNavigator } from '@react-navigation/stack'

/** Components */
import BottomNavigation from '../bottom_navigation'
import VideoPlayer from '../../screens/PlayVideo/VideoPlayer'

/** Screen */
import SplashScreen from '../../screens/splash-screen'
import HomeScreen from '../../screens/home-screen'
import ToolsListingScreen from '../../screens/tools-listing-screen'
import ToolsListItemScreen from '../../screens/tools-listing-item-screen'
import MethodologyScreen from '../../screens/methodology-screen'
import PianoAndScoreScreen from '../../screens/piano-score-screen'
import ConductingScreen from '../../screens/conducting-screen'
import LoadingScreen, { ScreenLoader } from '../../components/loading'

const Stack = createStackNavigator()
const ConductingStack = createStackNavigator();
const MethodologyStack = createStackNavigator();
const PianoStack = createStackNavigator();

export const ConductingStackNav = () => {

    return (
        <ConductingStack.Navigator
            initialRouteName='Home'
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <ConductingStack.Screen name="Home" component={ConductingScreen} />
            <ConductingStack.Screen name="ToolsListingScreen" component={ToolsListingScreen} />
            <ConductingStack.Screen name="ToolListItemScreen" component={ToolsListItemScreen} />
        </ConductingStack.Navigator>
    );
}

export const PianoStackNav = () => {
    return (
        <PianoStack.Navigator

            initialRouteName='Home'
            screenOptions={() => ({
                headerShown: false,
                gestureEnabled: false
            })}
        >
            <PianoStack.Screen name="Home" component={PianoAndScoreScreen} />
            <PianoStack.Screen name="ToolsListingScreen" component={ToolsListingScreen} />
            <PianoStack.Screen name="ToolListItemScreen" component={ToolsListItemScreen} />
        </PianoStack.Navigator>
    );
}

export const MethodologyStackNav = () => {

    return (
        <MethodologyStack.Navigator
            initialRouteName='Home'
            screenOptions={() => ({
                headerShown: false,
                gestureEnabled: false
            })}
        >
            <MethodologyStack.Screen name="Home" component={MethodologyScreen} />
            <MethodologyStack.Screen name="ToolsListingScreen" component={ToolsListingScreen} />
            <MethodologyStack.Screen name="ToolListItemScreen" component={ToolsListItemScreen} />
        </MethodologyStack.Navigator>
    );
}

/** Main Export */
export const StackNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName='splash'
            screenOptions={() => ({
                gestureEnabled: false,
                headerShown: false
            })}
        >
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            {/* <Stack.Screen name="home" component={ScreenLoader} /> */}
            <Stack.Screen name="Main" component={BottomNavigation} />
            <Stack.Screen name="ToolsListingScreen" component={ToolsListingScreen} />
            <Stack.Screen name="ToolListItemScreen" component={ToolsListItemScreen} />
            <Stack.Screen name="PlayerScreen" component={VideoPlayer} />
        </Stack.Navigator>
    )
}
