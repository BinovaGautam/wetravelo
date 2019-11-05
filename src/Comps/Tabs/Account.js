import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {Provider} from 'react-redux'
import FlightList from '../flights/FlightList';
import {Icon} from 'native-base'
import {strings} from '../assets'

let {darktext,lightTeal} = strings

export default class Account extends Component {
    static navigationOptions = ({navigation}) =>(
        {
            tabBarIcon:({ focused, horizontal, tintColor }) => 
            <View style={{backgroundColor:focused ? lightTeal : 'transparent',height:50,width:50,borderRadius:25 ,justifyContent:'center',marginTop: focused ?-25 : 0,elevation:focused?6:0}}>
            <Icon name="user" type="SimpleLineIcons" style={{color:focused?'#fff' : darktext,textAlign:'center',margin:8}} />
            </View>
        }
    ) 


    componentDidMount() {
        let {navigation} = this.props
        navigation.navigate('AuthStack')
    }
    render() {
        return (
          <Provider store={store}>
                 <View style={{marginTop:24,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                        <View style={{height:60}}>
                            <Text style={{margin:10,textAlign:'center',fontWeight:'600',color:darktext,fontSize:24}}> You have not logged In Yet!</Text>
                        </View>

                        <ScrollView style={{flex:1}}>
                    
                     
                        </ScrollView>
                        {/* <FlightList/> */}
                        
                 </View>
          </Provider>
        )
    }
}
