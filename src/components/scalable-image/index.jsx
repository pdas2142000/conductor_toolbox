/**React Import */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity, View } from 'react-native'

const resolveAssetSource = Image.resolveAssetSource

/**Main export */
const ScalableImage = ({
    width,
    height,
    onPress,
    onSize = () => { },
    background = false,
    scalableWidth,
    scalableHeight,
    source,
    style
}) => {

    const ImageComponent = Image
    const [ImageWidth, SetImageWidth] = useState(scalableWidth)
    const [ImageHeight, SetImageHeight] = useState(scalableHeight)

    const [ScalableWidth, SetScalableWidth] = useState(null)
    const [ScalableHeight, SetScalableHeight] = useState(null)
    const [Url, SetUrl] = useState(null)
    const Mounted = useRef(false)

    useEffect(() => {
        Mounted.current = true
        return () => {
            Mounted.current = false
        }
    }, [])

    useEffect(() => {
        OnProps({ source })
        SetImageWidth(scalableWidth)
        SetImageHeight(scalableHeight)
    }, [scalableWidth, scalableHeight])

    useEffect(() => {
        SetUrl(
            <ImageComponent
                source={{ uri: source.uri }}
                style={[
                    style,
                    {
                        width: ScalableWidth,
                        height: ScalableHeight,
                        resizeMode: 'cover',
                    },
                ]}
            />
        )
    }, [ScalableHeight, ScalableWidth])

    const OnProps = (localProps) => {
        const { source } = localProps
        if (source.uri) {
            const SourceToUse = source.uri ? source.uri : source
            Image.getSize(SourceToUse, (imageWidth, imageHeight) => {
                return AdjustSize(imageWidth, imageHeight, localProps)
            })
        } else {
            const SourceToUse = resolveAssetSource(source)
            AdjustSize(SourceToUse.width, SourceToUse.height, localProps)
        }
    }

    const AdjustSize = (sourceWidth, sourceHeight, localProps) => {
        let Ratio = 1
        if (ImageWidth && ImageHeight) {
            Ratio = Math.min(ImageWidth / sourceWidth, ImageHeight / sourceHeight)
        } else if (ImageWidth) {
            Ratio = ImageWidth / sourceWidth
        } else if (ImageHeight) {
            Ratio = ImageHeight / sourceHeight
        }

        if (Mounted.current) {
            const ComputedWidth = sourceWidth * Ratio
            const ComputedHeight = sourceHeight * Ratio
            SetScalableWidth(ComputedWidth)
            SetScalableHeight(ComputedHeight)
            localProps.onSize({ width: ComputedWidth, height: ComputedHeight })
        }
    }

    if (!onPress) {
        return Url
    } else {
        return <TouchableOpacity onPress={onPress}>{Url}</TouchableOpacity>
    }
}

ScalableImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
    onSize: PropTypes.func,
    background: PropTypes.bool,
}

export default ScalableImage
