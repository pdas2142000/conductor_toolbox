/** React Import */
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

/** Local Import */
import { Colors } from '../../utils/styles';
import { ms } from '../../utils/helpers/Metrics';

/** Main Export */
const LoadingScreen = () => {

    return (
        <View style={styles.ct_main_container}>
            <View style={styles.ct_indicator_box}>
                <ActivityIndicator size="large" color={Colors.ct_primary} />
            </View>
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    ct_main_container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 22
    },
    ct_indicator_box: {
        height: ms(80),
        width: ms(80),
        borderRadius: ms(8),
        backgroundColor: "rgba(0,0,0,0.1)",
        alignItems: "center",
        justifyContent: "center"
    }
});
