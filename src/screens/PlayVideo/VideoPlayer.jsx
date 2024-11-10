import { Dimensions, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

/** Library */
import Video from 'react-native-video'

/** Icons */
import LeftIcon from '../../../assets/svgs/angle-left.svg';
import PlayPause from './PlayPauseButton'

/**Components */
import ProgressBar from './progressbar'
import { IconProps } from '../../utils/helpers/icon-props';
import { ms } from '../../utils/helpers/Metrics';
import { Colors } from '../../utils/styles';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 16 / 9;
const videoWidth = screenWidth;
const videoHeight = videoWidth / aspectRatio;

const VideoPlayer = ({ route, navigation }) => {
    const { url } = route.params
    const VideoRef = useRef()
    const [Play, setPlay] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [loading, setLoading] = useState(true);
    const [IsLandscape, SetIsLandscape] = useState(null)

    useEffect(() => {
        if (Dimensions.get('window').width > Dimensions.get('window').height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
        Dimensions.addEventListener('change', onChange)
    }, [])

    const onChange = ({ window }) => {
        if (window.width > window.height) {
            SetIsLandscape(true)
        } else {
            SetIsLandscape(false)
        }
    }

    useEffect(() => {
        let timer;
        if (showOverlay) {
            timer = setTimeout(() => {
                setShowOverlay(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showOverlay]);

    const HandlePlay = () => {
        setPlay(true);
        setShowOverlay(false);
    };

    const HandlePause = () => {
        setPlay(false);
        setShowOverlay(true);
    };

    const handleOverlayPress = () => {
        setShowOverlay(true);
    };

    const onProgress = data => {
        setCurrentTime(data.currentTime);
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setLoading(false);
        console.log(data.duration);
    };

    const onEnd = () => {
        setPlay(true);
        VideoRef.current.seek(0);
    };

    const handleSeek = (value) => {
        if (VideoRef.current) {
            VideoRef.current.seek(value);
            setCurrentTime(value);
        }
    };

    return (
       
        <TouchableOpacity style={styles.ct_video_box} onPress={handleOverlayPress} activeOpacity={9} >
        
            <Video
                ref={VideoRef}
                source={{ uri: url }}
                style={IsLandscape ? { width: "100%", height: "100%" } : { width: videoWidth, height: videoHeight }}
                paused={Play}
                onProgress={onProgress}
                onEnd={onEnd}
                onLoad={onLoad}
                resizeMode={IsLandscape ? "cover" : "contain"}
                onBuffer={() => setLoading(true)}
            />
            {loading && (
                <View style={styles.ct_overlay_loading}>
                    <ActivityIndicator size="large" color={Colors.ct_primary} />
                </View>
            )}
            {
                showOverlay && (
                    <View style={styles.ct_overlay_box}>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LeftIcon {...IconProps(ms(20))} fill={"white"} />
                        </TouchableOpacity>
                        <View style={styles.ct_video_controler_box}>
                            <View style={{ height: IsLandscape ? "55%" : "50%", alignItems: "center", justifyContent: "flex-end" }}>

                                <PlayPause
                                    {...{
                                        styles,
                                        Play,
                                        showOverlay,
                                        HandlePause,
                                        HandlePlay,
                                        loading
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: IsLandscape ? ms(100) : null }}>
                                <ProgressBar
                                    {...{
                                        styles,
                                        currentTime,
                                        duration,
                                        handleSeek,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )
            }
        </TouchableOpacity>
      
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    ct_control_box: {
        height: ms(45),
        aspectRatio: 1,
        backgroundColor: Colors.ct_primary,
        borderRadius: ms(5),
        borderWidth: ms(1),
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    ct_time_box: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(14),
        paddingBottom: ms(7)
    },
    ct_time: {
        color: "white",
        fontSize: ms(15)
    },
    ct_video_box: {
        flex: 1,
        backgroundColor: Colors.ct_black,
        justifyContent: "center",
        alignItems: "center"
    },
    ct_overlay_box: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        padding: ms(20),
        justifyContent: "center",  // Ensure the overlay content is centered
    },
    ct_video_controler_box: {
        flex: 1,
        justifyContent: "space-between",
    },
    ct_overlay_loading: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
    },
})
