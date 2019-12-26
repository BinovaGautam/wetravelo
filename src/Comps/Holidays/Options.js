import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StatusBar,ScrollView,Image,Dimensions,ImageBackground } from 'react-native'
import {strings,Loader} from '../assets'
import Collapsible from 'react-native-collapsible';
import { Icon } from 'native-base';

let {dColor,darktext,lightGreen,lightTeal,silver,INR} = strings
let {width,height} = Dimensions.get('screen')

let length = width*0.9

export default class Options extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    
    
    render() {
        let {navigation} = this.props
        let plan = navigation.getParam('plan',null)
        plan.options.push(plan.options[1])
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {plan ? 
                 //plan options will be mapped here
                 <ScrollView style={{flex:1}}>
                     {plan.options.map((option,id) => {
                         let {days,nights,price,images,name,flight,hotel,food} = option
                         return(
                             <TouchableOpacity activeOpacity={0.8} key={id} 
                             style={{height:length*0.75,width: length,backgroundColor:lightGreen ,marginVertical:10,alignSelf:'center',borderRadius:10,elevation:5}}>
                                <ImageBackground source={{uri : plan.display_img }} style={{flex:1}} imageStyle={{borderRadius:10}} >
                                    <View style={{flex:2}}>
                                          <View style={{backgroundColor: darktext,justifyContent:'center',marginBottom:8,opacity: 0.8,
                                                            flexDirection:'row',height:30,width:100,alignItems:'center',borderTopLeftRadius:10}}>
                                                <Text style={{textAlign:'center',marginHorizontal:8,color:'#fff',fontWeight:'700',letterSpacing:1}}>{days} D</Text>
                                                <Text style={{textAlign:'center',marginHorizontal:8,color:'#fff',fontWeight:'700',letterSpacing:1}}>{nights} N</Text>
                                            </View>

                                    </View>
                                    <View style={{flex:1,flexDirection : 'row',backgroundColor: '#fff',borderRadius:10}}>
                                        
                                        <View style={{flex:1,backgroundColor: '#fff',opacity:1,marginBottom:8}}>
                                            <Text style={{fontSize:16,fontWeight:'700',color:darktext,margin:5,letterSpacing:1}}> {name} </Text>
                                            

                                            <View style={{backgroundColor: "tranparent",flexDirection:'row',flex:1,margin:5}}>
                                                

                                                <View style={{flex:3,justifyContent:'center',alignContent:'center'}}>
                                                    <Text style={{fontWeight:'500',color:dColor,letterSpacing:0.7,marginLeft:5}}>{flight ? 'Flight,' : null} {hotel ? 'Hotel,' : null} 
                                                    {food ? 'food' : null} and More. </Text>
                                                </View>

                                                <View style={{flex:1,justifyContent:'center',alignContent:'flex-end'}}>
                                                <Text style={{fontSize:14,fontWeight:'500',color:dColor,letterSpacing:1,textDecorationLine:'line-through'}}> {INR + parseInt(price + price*0.17)}</Text>
                                                <Text style={{fontSize:16,fontWeight:'700',color:darktext,letterSpacing:1}}> {INR + price}</Text>
                                                <Text style={{fontSize:11,color:lightTeal,fontWeight:'500',marginTop:-5}}>   Per Person</Text> 
                                                </View>
                                            </View>
                                        </View>

                                        
                                    </View>
                                </ImageBackground>
                             </TouchableOpacity>
                         )
                     })}
                 </ScrollView>

                 :
                 <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={{fontSize:18,fontWeight:'700' , color:darktext, marginHorizontal:20}}>No </Text>
                 </View>
                }
            </View>
        )
    }
}
