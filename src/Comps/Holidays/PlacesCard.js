import React from 'react'
import { Text, View,TouchableOpacity,StatusBar,ScrollView,Image,Dimensions } from 'react-native'
import {strings,Loader} from '../assets'
import { Icon } from 'native-base';

let {dColor,darktext,ghtGreen,lightTeal,silver,INR} = strings

let {width,height} = Dimensions.get('screen')

let length = width*0.43

const PlacesCard = (props) => {
    let {plan,navigation} = props
    let {title,display_img,startingPrice,options} = plan
    
    return(
        <TouchableOpacity  onPress={() => navigation.navigate('Options',{plan})}
        style={{width:length,height:200,justifyContent:'center',margin:10,}} activeOpacity={0.7}>
            <Image style={{flex:2,alignContent:'stretch',borderRadius:5}} source={{uri:display_img}}/>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'700',marginHorizontal:8,color:darktext,fontSize:14}}>{title}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <Text style={{fontWeight:'700',marginHorizontal:5,color:darktext,fontSize:14}}> ₹ {startingPrice}</Text>
                    <Text style={{fontWeight:'500',color:lightTeal,fontSize:12,alignSelf:'flex-end'}}>Per Person</Text>
                </View>
                <View style={{backgroundColor: silver,height:22,width:length/2,borderRadius:11,justifyContent:'center',alignSelf:'center'}}>
                    <Text style={{textAlign:'center',fontWeight:'500',color:darktext,fontSize:10}}>{options.length} Options</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

export default PlacesCard
