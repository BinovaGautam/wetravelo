import React from 'react'
import { View, Text,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import {strings} from '../assets'

const {dColor,darktext,refer_img} = strings
let {width,height} = Dimensions.get('screen')

const Refer = props => {
    let {title} = props
    return (
        
        <ImageBackground source={{uri: refer_img}} style={{width: width,height:width*2/3,marginBottom:24}}>
           <TouchableOpacity activeOpacity={0.8} style={{height:48,width:width*0.7,justifyContent:'center',position:'absolute',bottom:-24,backgroundColor: '#fff',borderRadius:24,elevation:5,alignSelf:'center'}}>
               <Text style={{textAlign:'center',fontWeight:'500',color:darktext,letterSpacing:1,fontSize:18}}>LEAR MORE </Text>
           </TouchableOpacity>
      </ImageBackground>
    )
}

export default Refer
