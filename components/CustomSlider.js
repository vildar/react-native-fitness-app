import React from 'react'
import {Text, View, Slider, StyleSheet} from 'react-native'
import {gray} from '../utils/colors'

export default function CustomSlider({max, step, onChange, unit, value}){
    return(
        <View style={styles.row}>
            <Slider
                style={{flex: 1}}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
                step={step}
            />
            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },

    metricCounter: {
        width: 85,
        alignItems: 'center',
        justifyContent: 'center'
    }
})