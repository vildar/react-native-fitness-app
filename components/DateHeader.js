import React from 'react'
import {Text, View} from 'react-native'

export default function DateHeader({date}){
    return (
        <View>
            <Text>{date}</Text>
        </View>
    )
}