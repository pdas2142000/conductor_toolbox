/** React Import */
import React from 'react';
import { LogBox } from 'react-native'

/** Library */
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './navigation/stack-navigation';


const App = () => {
    LogBox.ignoreAllLogs();
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
}

export default App;
