import React from 'react'
import { View, Text,TouchableOpacity,ImageBackground,Dimensions,Platform,Image } from 'react-native'
import {strings} from '../assets'
import { Icon } from 'native-base'

const {dColor,darktext,bac_img,lightTeal,color} = strings
let {width,height} = Dimensions.get('screen')

let length = width/6 - 8
const Services = props => {
    let {title,typeArray,navigation} = props
   
    return (
       <View > 
       <ImageBackground source={{uri : 'xxxx'}} style={{marginTop:24,width:width,marginBottom:8}}>
           <Text style={{margin:12,fontWeight:'700',color:darktext,fontSize:23,letterSpacing:1}}>What would you like to find?</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',}}  >
            { typeArray.map((item,id)=>
                                <TouchableOpacity key={id} onPress={() => navigation.navigate(item.to)}
                                style={{height:length,width:length,justifyContent:'center',elevation:4,backgroundColor: id ? darktext : lightTeal,borderRadius:5,margin:length/8}} activeOpacity={0.7}>
                                    <Icon name={item.icon} type={item.type} style={{fontWeight:'500',textAlign:'center',color:'#fff',fontSize:25}}/>
                                    <Text style={{fontWeight:'500',textAlign:'center',color:'#fff',fontSize:11}}>{item.name}</Text>
                                </TouchableOpacity>
                                )}

            </View>
       </ImageBackground>

       <View style={{flexDirection:'row'}}>
           <View style={{flex:1}}>
                <Text style={{margin:12,fontWeight:'700',color:darktext,fontSize:28,letterSpacing:1,textAlign:'right'}}>Love To Travel ?</Text>
                <Text style={{margin:12,fontWeight:'500',color:darktext,fontSize:12,letterSpacing:0.7,flex:1,textAlign:'right'}}>One Stop Solution For All Kind Of Travelling, Touring and many other things.</Text>

           </View>
           <Image source={require('../assets/Images/travellingUD.png')} style={{height:width*0.55,width:width*0.55}}/>
       </View>
      </View>
    )
}

export default Services
