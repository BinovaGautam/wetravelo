import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {Provider} from 'react-redux'
import FlightList from '../flights/FlightList';

export default class Home extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
          <Provider store={store}>
                 <View style={{marginTop:24,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                        <View style={{height:60}}>
                            <Text style={{margin:10}}></Text>
                        </View>

                        <ScrollView style={{flex:1}}>
                    
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        <HotelCard name="binova"/>
                        
                        </ScrollView>
                        {/* <FlightList/> */}
                        
                 </View>
          </Provider>
        )
    }
}
