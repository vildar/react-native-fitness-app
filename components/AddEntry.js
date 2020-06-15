import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import CustomSlider from './CustomSlider'
import CustomStepper from './CustomStepper'
import DateHeader from './DateHeader'
import { Entypo } from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'

function SubmitBtn({onPress}){
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))

        submitEntry({ key, entry })
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    reset = () => {
        const key = timeToString()

        removeEntry(key)
    }

    render(){
        const metaInfo = getMetricMetaInfo()

        if(true){
            return(
                <View>
                    <Entypo name="emoji-happy" size={100} color="black" />
                    <Text>You have already logged information for today.</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader date={new Date().toLocaleDateString()}/>
                {
                    Object.keys(metaInfo).map((key) => {
                        const {getIcon, type, ...rest } = metaInfo[key]
                        const value = this.state[key]
                        
                        return (
                            <View key={key}>
                                {getIcon()}
                                {
                                    type === 'slider'
                                    ?   <CustomSlider
                                            value = {value}
                                            onChange = {(val) => this.slide(key, val)}
                                            {...rest}
                                        />
                                    :   <CustomStepper
                                            value = {value}
                                            onIncrement = {() => this.increment(key)}
                                            onDecrement = {() => this.decrement(key)}
                                            {...rest}
                                        />
                                }
                            </View>
                        )
                    })
                }
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}