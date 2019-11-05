import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView,Platform} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {Provider} from 'react-redux'
import FlightList from '../flights/FlightList';
import {Icon} from 'native-base'
import {strings} from '../assets'

let {darktext,lightTeal} = strings
let ios = Platform.OS === 'ios'
export default class Home extends Component {
    static navigationOptions = ({navigation}) =>(
        {
            tabBarIcon:({ focused, horizontal, tintColor }) => 
            <View style={{backgroundColor:focused ? lightTeal : 'transparent',height:50,width:50,borderRadius:25 ,justifyContent:'center',marginTop: focused ?-25 : 0,elevation:focused?6:0}}>
            <Icon name="home" type='AntDesign' style={{color:focused?'#fff' : darktext,textAlign:'center',margin:8}} />
            </View>
        }
    ) 
    render() {
        let typeArray = [
            {name:'Flights',icon:'plane',type:'SimpleLineIcons',to:'Flights'},
            {name:'Hotels',icon:'building-o',type:'FontAwesome',to:'Hotels'},
            {name:'Buses',icon:'ios-bus',type:'Ionicons',to:'Bus'},
        ]
        let {navigation} = this.props
        return (
          <Provider store={store}>
                 <View style={{marginTop:24,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                        <View style={{height:70,margin:8,borderRadius:5,flexDirection:'row'}}>
                           { typeArray.map((item,id)=>
                            <TouchableOpacity key={id} onPress={() => navigation.navigate(item.to)}
                             style={{flex:1,margin:8,justifyContent:'center'}} activeOpacity={0.7}>
                                <Icon name={item.icon} type={item.type} style={{fontWeight:'500',textAlign:'center',color:darktext}}/>
                                <Text style={{fontWeight:'500',textAlign:'center',color:darktext}}>{item.name}</Text>
                            </TouchableOpacity>
                            )}
                        </View>

                        <ScrollView style={{flex:1,backgroundColor: '#f5f5f5',}}>
                            <View style={{margin:8,backgroundColor: '#fff',borderRadius:4,padding:8}}>
                                    <Text style={{margin:10,fontWeight:'500',color:darktext,fontSize:28,fontFamily:ios?'Optima':'sans-serif-medium'}}> Welcome</Text>
                                    <Text style={{margin:10,fontWeight:'500',color:darktext,letterSpacing:1,}}>
                                        Glad to see you here, thank you for joinig WeTravelo Family. WeTravelo provides flight,Bus tickets and hotel accomodations at best rates.
                                        </Text>

                                   <View style={{height:30,flexDirection:'row',marginTop:10}}>
                                      <TouchableOpacity style={{flex:1,justifyContent:'center',borderRightWidth:1,borderColor:lightTeal}} activeOpacity={0.8}>
                                          <Text style={{textAlign:'center',fontWeight:'500',color:lightTeal}}>SIGN IN</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity style={{flex:1,justifyContent:'center'}} activeOpacity={0.8}>
                                          <Text style={{textAlign:'center',fontWeight:'500',color:lightTeal}}>CREATE ACCOUNT</Text>
                                      </TouchableOpacity>
                                   </View>     
                       
                            </View>
                    
                     
                        </ScrollView>
                        {/* <FlightList/> */}
                        
                 </View>
          </Provider>
        )
    }
}

//Animate on Scroll ... Add Shadow when scroll up.