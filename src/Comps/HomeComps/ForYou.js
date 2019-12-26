import React from 'react'
import { View, Text,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import {strings} from '../assets'

const {dColor,darktext,bac_img} = strings
let {width,height} = Dimensions.get('screen')
const ForYou = props => {
    let {title} = props
    return (
        
        <ImageBackground source={{uri: bac_img}} style={{width: width,height:height}}>
           <Text style={{fontSize:18,fontWeight:'500',color:darktext,letterSpacing:1,margin:10}}>PLACES</Text>
           <View />
      </ImageBackground>
    )
}

export default ForYou
