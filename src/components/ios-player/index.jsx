/**React Import */
import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import Video from 'react-native-video'

/**Main export */
const IosPlayer = ({ IosUrl, SetIosUrl, SetLoading }) => {

    const Player = useRef();
    const ExitPlayer = () => {
        SetLoading(false)
        SetIosUrl({
            url: [],
            show: false,
        });
    };
    return (
        <Video
            source={{ uri: IosUrl.url }}
            ref={Player}
            onError={ExitPlayer}
            onFullscreenPlayerDidDismiss={ExitPlayer}
            fullscreen={true}
            onLoad={() => {
                Player.current.presentFullscreenPlayer();
            }}
            volume={0.75}
            ignoreSilentSwitch='ignore'
            style={styles.backgroundVideo}
        />
    );
};
export default IosPlayer;
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        height: 0,
        width: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        opacity: 0,
    },
});
