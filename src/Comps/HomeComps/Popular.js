import React from 'react'
import { View, Text,TouchableOpacity,ImageBackground,Dimensions,Platform,Image } from 'react-native'
import {strings} from '../assets'
import { Icon } from 'native-base'

const {dColor,darktext,bac_img,lightTeal,silver,lightGreen} = strings
let {width,height} = Dimensions.get('screen')

let length = width*0.43
const Popular = props => {
    let {title,navigation} = props
    let data = [
        {title:'Dubai',options:32, price:'33,599',img:'http://www.ttgmena.com/wp-content/uploads/2019/01/only-in-dubai.jpg'},
        {title:'Bali',options:44, price:'29,599',img:'https://ak4.picdn.net/shutterstock/videos/1029204434/thumb/5.jpg'},
        {title:'Europe',options:56, price:'39,599',img:'https://ak4.picdn.net/shutterstock/videos/1029204434/thumb/5.jpg'},
        {title:'North East',options:23, price:'19,599',img:'https://theunn.com/wp-content/uploads/2018/08/1501768556_1457413695_1442282529853_2-678x381.jpg'},
    ]
    if(data.length%2) data.pop()
    return (
       <View style={{marginTop:24,}}>
           <Text style={{margin:12,fontWeight:'500',color:darktext,fontSize:23,letterSpacing:1}}>Popular Holiday Destinations</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}  >
            { data.map((item,id)=>
                                <TouchableOpacity key={id} onPress={() => navigation.navigate('item.to')}
                                style={{width:length,height:200,justifyContent:'center',margin:12}} activeOpacity={0.7}>
                                    <Image style={{flex:2,alignContent:'stretch'}} source={{uri:item.img}}/>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{fontWeight:'700',marginHorizontal:8,color:darktext,fontSize:16}}>{item.title}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                           
                                            <Text style={{fontWeight:'700',marginHorizontal:5,color:darktext,fontSize:16}}>₹ {item.price}</Text>
                                            <Text style={{fontWeight:'500',color:lightTeal,fontSize:12,alignSelf:'flex-end'}}>Per Person</Text>
                                        </View>
                                        <View style={{backgroundColor: silver,height:22,width:length/2,borderRadius:11,justifyContent:'center',alignSelf:'center'}}>
                                            <Text style={{textAlign:'center',fontWeight:'500',color:darktext,fontSize:10}}>{item.options} Options</Text>
                                        </View>
                                    </View>
                                   
                                </TouchableOpacity>
                                )}

                          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HolidaysCat')}
                           style={{borderWidth:1.2,borderColor:lightTeal,borderRadius:5,height:45,justifyContent:'center',margin:20,width:width-40,alignSelf:'center'}}>
                           <Text style={{textAlign:'center',fontWeight:'500',color:lightTeal,fontSize:16,letterSpacing:1}}>SEE ALL</Text>
                          </TouchableOpacity>      

            </View>
       </View>
    )
}

export default Popular
