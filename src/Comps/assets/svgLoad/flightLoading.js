import React, { Component } from 'react'
import { Text, View,Dimensions } from 'react-native'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import strings from '../strings'

const {height,width} = Dimensions.get('screen')
let {dColor,lightTeal,silver} = strings

export default class FlightLoading extends Component {
    render() {
        return (
            <View style={{flex:1,paddingLeft:10}}>
                {[1,2,3,4,5,6,7,8].map((item,id) => 
                <SvgAnimatedLinearGradient key={item} width={width}
                height={80}>
                            <Circle cx="40" cy="30" r="30"/>
                <Rect x="75" y="13" rx="4" ry="4" width={width/3} height="20"/>
                <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
                <Rect x={width*0.71 } y="10" rx="5" ry="5" width="50" height="50"/>
                <Rect x="0" y="65" rx="4" ry="4" width={width} height="2"/>
                 </SvgAnimatedLinearGradient>
                )}
            </View>
        )
    }
}
