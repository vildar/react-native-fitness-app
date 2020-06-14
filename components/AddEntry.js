import React, {Component} from 'react'
import {View} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'
import Slider from './Slider'
import Stepper from './Stepper'

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo()

        this.getState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.getState((state) => {
            const count = state[metric] + getMetricMetaInfo(metric).step

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

    render(){
        const metaInfo = getMetricMetaInfo()

        return (
            <View>
                {
                    Object.keys(metaInfo).map((key) => {
                        const metric = metaInfo[key]
                        const value = this.state[key]
                        
                        return (
                            <View key={key}>
                                {metric.getIcon()}
                                {
                                    metric.type === 'slider'
                                    ?   <Slider
                                            value = {value}
                                            onChange = {(value) => this.slide(key, value)}
                                            {...metric}
                                        />
                                    :   <Stepper
                                            value = {value}
                                            onIncrement = {() => this.increment(key)}
                                            onDecrement = {() => this.decrement(key)}
                                            {...metric}
                                        />
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}