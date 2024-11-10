/** React Import */
import React, { useEffect, useState } from 'react'
import {
    View,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'

/**Library */
import HTML, { useInternalRenderer } from 'react-native-render-html'

/**Local Imports */
import { makeRequest } from '../../utils/make-request'
import { hs, ms } from '../../utils/helpers/Metrics'
import { Fonts } from '../../utils/styles'
import { getDeviceType, getVersion } from 'react-native-device-info'

/** Components */
import AppHeader from '../../components/app-header'
import ScalableImage from '../../components/scalable-image'

/** Local Import */
import { Colors } from '../../utils/styles'

let deviceType = getDeviceType()
let version = getVersion()

/** Main Export */
const IntroScreen = () => {

    const IsFocused = useIsFocused()

    const [Content, SetContent] = useState('')
    const [Id, SetId] = useState()
    const [Response, SetResponse] = useState([])
    const [ImageWidth, SetImageWidth] = useState(
        Dimensions.get('window').width - 40,
    )
    const HtmlContent = decodeURIComponent(Content)
    const CleanedContent = HtmlContent.replace(/<p>(&nbsp;|\s)*<\/p>/g, '')

    useEffect(() => {
        GetData()
        Dimensions.addEventListener('change', OnChange)
    }, [IsFocused])

    const OnChange = ({ window: { width } }) => {
        SetImageWidth(width - 40)
    }

    const GetData = async () => {
        try {
            const Response = await makeRequest("POST", "get_content", {}, { type: 'about' }, true)
            const [{ content, id }] = Response.data
            SetId(id)
            SetContent(content)
            SetResponse(true)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const CustomRenderer = {
        renderers: {
            a: htmlAttribs => {
                const { Renderer, rendererProps } = useInternalRenderer('a', htmlAttribs)
                return (
                    <Renderer
                        {...rendererProps}
                    />
                )
            },
            img: htmlAttribs => {
                const { Renderer, rendererProps } = useInternalRenderer(
                    'img',
                    htmlAttribs,
                )
                var isVideo = false
                if (htmlAttribs.tnode.parent.elementModel.tagName === 'a') {
                    isVideo = true
                }
                return (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: Dimensions.get('window').width - 40,
                            position: 'relative',
                        }}>
                        {!isVideo ? (
                            <TouchableHighlight>
                                <ScalableImage
                                    source={{ uri: rendererProps.source.uri }}
                                    scalableWidth={ImageWidth}
                                    scalableHeight={350}
                                />
                            </TouchableHighlight>
                        ) : (
                            <TouchableHighlight
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <>
                                    <PlayerIcon
                                        {...IconProps(50)}
                                        fill="white"
                                        style={{ zIndex: 1, position: 'absolute' }}
                                    />
                                    <ScalableImage
                                        source={{ uri: rendererProps.source.uri }}
                                        scalableWidth={ImageWidth}
                                        scalableHeight={350}
                                    />
                                </>
                            </TouchableHighlight>
                        )}
                    </View>
                )
            },
        },
        customListStyleSpecs: {
            ol: (htmlAttribs, passProps) => {
                const { index } = passProps
                const bulletNumber = htmlAttribs.start ? htmlAttribs.start : index + 1
                return (
                    <Text
                        style={{
                            width: hs(25),
                            marginLeft: hs(-20),
                            fontSize: ms(15),
                            color: '#333',
                            fontWeight: '600',
                            lineHeight: hs(21),
                        }}>
                        {bulletNumber}
                    </Text>
                )
            },
        },
    }

    const ClassesStyles = {
        bold_italic: {
            fontFamily: Fonts.Font_900,
        },
    }

    const TagsStyles = {

        li: {
            fontSize: ms(14),
            color: '#333',
            fontFamily: Fonts.Font_200,
            lineHeight: hs(20),
        },
        a: {
            fontSize: ms(14),
            color: '#333',
            fontFamily: Fonts.Font_200,
            lineHeight: hs(20),
        },
        h1: {
            fontSize: ms(20),
            fontFamily: Fonts.Font_300,
            color: "#333",
            textTransform: 'capitalize',
            fontWeight: '400',
            paddingTop: hs(11),
            margin: 0,
        },
        h2: {
            fontSize: ms(18),
            fontFamily: Fonts.Font_300,
            color: '#333',
            textTransform: 'capitalize',
            fontWeight: '400',
            margin: 0,
        },
        em: {
            fontFamily: Fonts.Font_100,
        },
        strong: {
            fontFamily: 'Roboto-Bold',
        },
    }

    const RenderersProps = {
        img: {
            enableExperimentalPercentWidth: true,
        },
    }

    return (
        <View style={styles.ct_main_container}>
            <AppHeader
                {...{
                    title: "Introduction"
                }}
                willGoBack={true}
            />
            {Response.length === 0 ? (
                <View
                    style={styles.ct_indicator}>
                    <ActivityIndicator size="large" color={Colors.ct_primary} />
                </View>
            ) : (
                <ScrollView style={{ marginHorizontal: hs(20) }}>
                    <HTML
                        source={{ html: CleanedContent }}
                        contentWidth={Dimensions.get('window').width - 20}
                        {...CustomRenderer}
                        classesStyles={ClassesStyles}
                        tagsStyles={TagsStyles}
                        renderersProps={RenderersProps}
                    />
                    <Text style={styles.ct_version_text_style}>Version {version || '1.3'}</Text>
                </ScrollView>
            )}
        </View>
    )
}

export default IntroScreen

const styles = StyleSheet.create({
    ct_main_container: {
        backgroundColor: '#fff',
        flex: 1,
        flexGrow: 1
    },
    ct_indicator: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    },
    ct_version_text_style: {
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.65)',
        fontFamily: Fonts.Font_300,
        fontSize: ms(16),
    },
})