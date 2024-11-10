/** React Import */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

/** Library */
import { deviceType } from '../../utils/helpers/Metrics';

/** Main export */
const ScreenImage = ({IsLandscape, IsFocused, LogoWidth, Url }) => {
    return (
        <View
            style={[
                IsLandscape
                    ? ScreenStyles.ct_landscape_true
                    : ScreenStyles.ct_landscape_false,
            ]}>
            {!IsFocused ? null : (
                <View style={[IsLandscape ? { flexDirection: 'row' } : null]}>
                    <View
                        style={[
                            ScreenStyles.ct_icon_container_style,
                            IsLandscape
                                ? ScreenStyles.ct_image_box
                                : null,
                        ]}>
                        <Image
                            source={Url}
                            resizeMode="contain"
                            style={[
                                IsLandscape
                                    ? { height: LogoWidth * 0.18, width: LogoWidth * 0.18 }
                                    : { height: LogoWidth * 0.3, width: LogoWidth * 0.3 },
                                !IsLandscape & (deviceType === 'Tablet')
                                    ? { height: LogoWidth * 0.25, width: LogoWidth * 0.25 }
                                    : null,
                            ]}
                        />
                    </View>
                </View>
            )}
        </View>
    );
} 

export default ScreenImage;

const ScreenStyles = StyleSheet.create({
    ct_landscape_true: {
        paddingHorizontal: '5%',
        alignItems:"center",
        justifyContent:"center",
        paddingVertical: '5%',
    },
    ct_landscape_false: {
        paddingVertical: '5%',
        alignItems: "center",
    },
    ct_icon_container_style: {
        paddingVertical: '5%',
        alignItems: 'center'
    },
    ct_image_box:{ 
        width: '50%', 
        alignItems: 'center' 
    }
});