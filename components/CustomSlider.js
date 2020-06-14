import React from 'react'
import {Text, View, Slider} from 'react-native'

export default function CustomSlider({max, step, onChange, unit, value}){
    return(
        <View>
            <Slider 
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
                step={step}
            />
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    )
}