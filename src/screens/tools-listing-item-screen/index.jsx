/**React Import */
import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    Linking,
} from 'react-native'

/**Library */
import { useIsFocused } from '@react-navigation/native'
import HTML, { useInternalRenderer } from 'react-native-render-html'

/**Local Import */
import { Colors } from '../../utils/styles'
import { Fonts } from '../../utils/styles'
import { ms, hs } from '../../utils/helpers/Metrics'
import { IconProps } from '../../utils/helpers/icon-props'
import { makeRequest } from '../../utils/make-request'

/**Components */
import AppHeader from '../../components/app-header'
import ScalableImage from '../../components/scalable-image'

/**Icons */
import LeftArrowIcon from '../../../assets/svgs/arrow-small-left.svg'
import RightArrowIcon from '../../../assets/svgs/arrow-small-right.svg'
import PlayerIcon from '../../../assets/svgs/play-circle.svg'
import IosPlayer from '../../components/ios-player'
import LoadingScreen from '../../components/loading'

/**Main Export */
const ToolsListItemScreen = ({ route, navigation }) => {

    const RenderHTML = useMemo(() => HTML, []);

    const { listItem, id, type, direct, allData } = route.params
    const IsFocused = useIsFocused()
    const [Loading, SetLoading] = useState(false)
    const [LoadingVideo, SetLoadingVideo] = useState(false)
    const [ItemId, setItemId] = useState(id)
    const [ItemType, setItemType] = useState(type)
    const [Data, setData] = useState(null);
    const Htmlcontent = useMemo(() => decodeURIComponent(Data?.content || ''), [Data]);

    const [ImageWidth, SetImageWidth] = useState(
        Dimensions.get('window').width - 40,
    )
    console.log("ImageWidth", ImageWidth)
    const [IosUrl, SetIosUrl] = useState({
        url: [],
        show: false,
    })

    const CleanedContent = useMemo(() => Htmlcontent.replace(/&nbsp;/g, ''), [Htmlcontent]);

    useEffect(() => {
        if (direct)
            GetData()
        else {
            setData(listItem);
            SetLoading(true)
        }
        SetImageWidth(Dimensions.get('window').width - 40)
        Dimensions.addEventListener('change', onChange)
        return () => {
            SetImageWidth(Dimensions.get('window').width - 40)
            SetLoading(true)
        }

    }, [IsFocused, direct, listItem, onChange])


    const onChange = ({ window }) => {
        SetImageWidth(window.width - 40) 
    }

    const GetData = async () => {
        console.log("jbjbjbj")
        SetLoading(false)
        let Response = await makeRequest("POST", "get_content", {}, { type: ItemType, subtype: id ? id : "" }, true)
        setData(Response.data);
        SetLoading(true)
    }

    var CustomRenderer = useMemo(()=>({
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
                );
                var isVideo = false;
                if (htmlAttribs.tnode.parent.elementModel.tagName === 'a') {
                    isVideo = true;
                }
                return (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            width: ImageWidth,
                        }}>
                        {isVideo ? (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <PlayerIcon
                                    {...IconProps(50)}
                                    fill="white"
                                    style={styles.cd_play_icon}
                                />
                                <ScalableImage
                                    source={{ uri: rendererProps.source.uri }}
                                    scalableWidth={ImageWidth}
                               
                                />
                            </View>
                        ) : (
                            <View>
                                <ScalableImage
                                    source={{ uri: rendererProps.source.uri }}
                                    scalableWidth={ImageWidth}
                             
                                />
                            </View>
                        )}
                    </View>
                );
            },
        },
        customListStyleSpecs: {
            ol: (htmlAttribs, passProps) => {
                const { index } = passProps;
                const bulletNumber = htmlAttribs.start ? htmlAttribs.start : index + 1;
                return (
                    <Text
                        style={{
                            width: hs(24),
                            marginLeft: hs(-20),
                            fontSize: ms(13),
                            color: '#333',
                            fontWeight: '600',
                            lineHeight: hs(20),
                        }}>
                        {bulletNumber}
                    </Text>
                );
            },
        },
    }), [ImageWidth]);

    const ClassesStyles = useMemo(() => ({
        bold_italic: {
            fontFamily: Fonts.Font_900,
        },
    }), []);

    const TagsStyles = useMemo(() => ({
        p: {
            fontSize: ms(14),
            color: '#333',
            fontFamily: Fonts.Font_200,
            lineHeight: hs(20),
        },
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
            overflow: 'hidden',
        },
        h1: {
            fontSize: ms(20),
            fontFamily: Fonts.Font_300,
            color: '#333',
            textTransform: 'capitalize',
            fontWeight: '400',
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
            fontFamily: Fonts.Font_Bold_800,
        },
    }), []);

    function ComputeEmbeddedMaxWidth(contentWidth, tagName) {
        if (tagName === 'img') {
            return Math.min(contentWidth, 100);
        }
        return contentWidth;
    }

    useEffect(() => {
        console.log('LoadingVideo CHANGED') 
    }, [LoadingVideo]);

    // Function to play video
    const PlayVideo = async (url) => {
        if (!url.includes('https://vimeo.com/')) {
            Linking.openURL(url);
            return;
        }
        SetLoadingVideo(true)
        const requestOptions = {
            method: "GET",
            headers: { "Accept": "application/vnd.vimeo.*+json;version=3.4", "Authorization": "bearer 5ca4b0a78d6a467dd8b9cfba5425e271" }
        };

        url = url.split('/')[url.split('/').length - 1];

        fetch(`https://api.vimeo.com/videos/${url}?fields=play.hls.link`, requestOptions).then(response => response.json()).then(data => {
            Platform.OS === 'ios' ?
                SetIosUrl({
                    url: data.play.hls.link,
                    show: true
                }) :
                navigation.navigate("PlayerScreen", { url: data.play.hls.link })
            Platform.OS==="android" && SetLoadingVideo(false)
        }).catch((error) => console.log(error))
    }

    console.log("allData",allData)

    return (
        <>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {direct ? (
                    <AppHeader title={ItemType} willGoBack={true} popBack={false} />
                ) : (
                    <AppHeader title={ItemType} willGoBack={true} popBack={true} />
                )}
                {
                    LoadingVideo ?
                        <LoadingScreen /> :
                        !Loading || !Data ?
                            <View style={styles.ct_main_container}>
                                <ActivityIndicator size="large" color={Colors.ct_primary} />
                            </View>
                            : null
                }
                {
                    Data ?
                        <ScrollView>
                            <View style={styles.container}>
                                {direct ? (
                                    <FlatList
                                        data={Data}
                                        keyExtractor={(id, index) => Data[index].id}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    <View style={styles.ScreenSubtitleViewStyle}>
                                                        <Text style={styles.ScreenSubtitleStyle}>
                                                            {item.subtype_name}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.ScreenTitleStyle}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                ) : (
                                    <View>
                                        <View style={styles.ScreenSubtitleViewStyle}>
                                            <Text style={styles.ScreenSubtitleStyle}>
                                                {Data.subtype_name} -{' '}
                                                {allData.findIndex(x => x.id === Data.id) + 1}
                                            </Text>
                                        </View>
                                        <Text style={styles.ScreenTitleStyle}>{Data.title}</Text>
                                    </View>
                                )}
                                {direct ? (
                                    <FlatList
                                        data={Data}
                                        keyExtractor={(id, index) => Data[index].id}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginHorizontal: hs(15) }}>
                                                    <RenderHTML
                                                        source={{
                                                            html: decodeURIComponent(item.content).replace(
                                                                /&nbsp;/g,
                                                                '',
                                                            ),
                                                        }}
                                                        {...CustomRenderer}
                                                        contentWidth={Dimensions.get('window').width - 40}
                                                        renderersProps={{
                                                            a: {
                                                                onPress: async (event, url) => PlayVideo(url)
                                                            }
                                                        }}
                                                        tagsStyles={TagsStyles}
                                                        classesStyles={ClassesStyles}
                                                        computeEmbeddedMaxWidth={ComputeEmbeddedMaxWidth}
                                                        onPress={(event, url) => {
                                                            console.log('pressed one')
                                                        }}
                                                    />
                                                </View>
                                            );
                                        }}
                                    />
                                ) : (
                                    <View style={{ marginHorizontal: hs(20) }}>
                                        <RenderHTML
                                            source={{ html: CleanedContent }}
                                            contentWidth={Dimensions.get('window').width - 40}
                                            {...CustomRenderer}
                                            renderersProps={{
                                                a: {
                                                    onPress: async (event, url) => PlayVideo(url)
                                                }
                                            }}
                                            tagsStyles={TagsStyles}
                                            classesStyles={ClassesStyles}
                                            computeEmbeddedMaxWidth={ComputeEmbeddedMaxWidth}
                                            onPress={(event, url) => {
                                                console.log('pressed one')
                                            }}
                                        />
                                    </View>
                                )}
                                {direct ? null : (
                                    <View style={styles.ItemsNavigationStyle}>
                                        <View>
                                            {Data.previous === '' ? null : (
                                                <TouchableOpacity
                                                    style={styles.ItemsNavigationButtonStyle}
                                                    onPress={() => {
                                                        setItemId(Data.previous);
                                                        setData(
                                                            allData.find(filterId => {
                                                                return filterId.id == Data.previous;
                                                            }),
                                                        );
                                                    }}>
                                                    <LeftArrowIcon {...IconProps(20)} fill={Colors.ct_primary} />
                                                    <Text style={styles.ItemsNavigationButtonTextStyle}>
                                                        Prev
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View>
                                            {Data.next === '' ? null : (
                                                <TouchableOpacity
                                                    style={styles.ItemsNavigationButtonStyle}
                                                    onPress={() => {
                                                        setItemId(Data.next);
                                                        setData(
                                                            allData.find(filterId => {
                                                                return filterId.id == Data.next;
                                                            }),
                                                        );
                                                    }}>
                                                    <Text style={styles.ItemsNavigationButtonTextStyle}>
                                                        Next
                                                    </Text>
                                                    <RightArrowIcon
                                                        {...IconProps(20)}
                                                        fill={Colors.ct_primary}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                        : null
                }
            </View>
            {IosUrl.show && <IosPlayer IosUrl={IosUrl} SetIosUrl={SetIosUrl} SetLoading={SetLoadingVideo} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hs(20),
    },
    ScreenTitleStyle: {
        fontSize: ms(22),
        fontFamily: 'BalooBhaina2-Medium',
        color: Colors.ct_primary,
        marginHorizontal: hs(20),
    },
    ScreenSubtitleViewStyle: {
        backgroundColor: Colors.ct_primary,
        marginBottom: hs(12),
        marginHorizontal: hs(19),
        paddingHorizontal: hs(13),
        paddingVertical: hs(8),
        alignSelf: 'flex-start',
        borderRadius: hs(30),
    },
    ScreenSubtitleStyle: {
        fontSize: ms(14),
        fontFamily: 'Roboto-Medium',
        color: '#fff',
        alignSelf: 'flex-start',
    },
    cd_play_icon: {
        zIndex: 1,
        position: 'absolute',
    },
    ItemsNavigationStyle: {
        padding: hs(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'right',
    },
    ItemsNavigationButtonStyle: {
        height: hs(34),
        borderWidth: 1,
        borderColor: Colors.ct_light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hs(6),
        paddingHorizontal: hs(12),
    },
    ItemsNavigationButtonTextStyle: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_700,
        color: Colors.ct_primary,
        paddingTop: hs(3),
    },
    ct_main_container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 22
    },
})

export default ToolsListItemScreen
