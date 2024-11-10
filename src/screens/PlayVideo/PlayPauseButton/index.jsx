/**React import */
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

/**Icons */
import PlayIcon from "../../../../assets/svgs/play.svg"
import PauseIcon from "../../../../assets/svgs/pause.svg"

/** Local Import */
import { IconProps } from '../../../utils/helpers/icon-props'
import { ms } from '../../../utils/helpers/Metrics'

/** Main export */
const PlayPause = ({ styles, Play, HandlePause, HandlePlay }) => {
    return (
        <TouchableOpacity
            style={styles.ct_control_box}
            onPress={Play ? HandlePause : HandlePlay}
        >
            {
                Play ? (
                    <PlayIcon {...IconProps(ms(22))} fill={"white"} />
                ) : (
                    <PauseIcon {...IconProps(ms(22))} fill={"white"} />
                )
            }
        </TouchableOpacity>
    )
}

export default PlayPause