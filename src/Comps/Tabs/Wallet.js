import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView,Image} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {Provider} from 'react-redux'
import FlightList from '../flights/FlightList';
import {Icon} from 'native-base'
import {strings} from '../assets'

let {darktext,lightTeal,silver,dColor} = strings

export default class Wallet extends Component {
    static navigationOptions = ({navigation}) =>(
        {
            tabBarIcon:({ focused, horizontal, tintColor }) => 
            <View style={{backgroundColor:focused ? lightTeal : 'transparent',height:50,width:50,borderRadius:25 ,justifyContent:'center',marginTop: focused ?-25 : 0,elevation:focused?6:0}}>
            <Icon name="wallet" type="SimpleLineIcons" style={{color:focused?'#fff' : darktext,textAlign:'center',margin:8}} />
            </View>
        }
    ) 
    render() {
        let types = [
                    {title:'WETRAVLO CASH',amount:787},
                    {title:'REWARDS',amount:500},
        ]
        return (
          
                    <View style={{marginTop:50,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                        <View style={{height:100,flexDirection:'row',margin:10,borderBottomWidth:0.8,borderColor:silver}}>
            
                            <View style={{flex:3,marign:10}}>
                                <Text style={{margin:5,fontWeight:'700',color:darktext,fontSize:28}}> ₹ 1287</Text>
                                <Text style={{margin:8,fontWeight:'500',color:darktext,fontSize:16,letterSpacing:1}}> WALLET BALANCE</Text>
                            </View>

                            <View style={{marign:15,flex:1,alignContent:'center'}}>
                                <Image source={require('../assets/Images/wallet.png')} style={{height:60,width:60}}/>
                            </View>
                            
                        </View>

                        <View style={{flexDirection:'row'}}>
                          {types.map((type,id) => 
                          <View style={{flex:1,margin:10,backgroundColor: '#f5f5f5',justifyContent:'center'}}>
                              <Text style={{margin:8,fontWeight:'500',color:darktext,fontSize:16,letterSpacing:1}}>{type.title} </Text>
                              <Text style={{margin:8,fontWeight:'700',color:darktext,fontSize:18}}>₹ {type.amount} </Text>
                          </View>
                          )}
                        </View>

                        {/* <View style={{margin:15}}>
                            <Text style={{fontSize:18,fontWeight:'600',letterSpacing:1,color:dColor,marginBottom:20}}>ACCOUNT SETTING</Text>
                            {settingsArray.map((setting,id)=>
                             <TouchableOpacity key={id} activeOpacity={0.8} style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0.5,borderColor:silver}}>
                                 <Text style={{margin:10,alignSelf:'center',fontSize:17,fontWeight:'600',color:darktext,letterSpacing:1}}> {setting.title} </Text>
                                 <Icon name={setting.icon_name} type={setting.icon_type} style={{alignSelf:'center',margin:10}}/>
                             </TouchableOpacity>
                            )}
                        </View> */}

                        <ScrollView style={{flex:1}}>
                    
                     
                        </ScrollView>
                        {/* <FlightList/> */}
                        
                 </View>
       
         
        )
    }
}
