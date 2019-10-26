import React, { Component } from 'react'
import { Text, View , StatusBar,ScrollView } from 'react-native'
import HotelCard from './HotelCard.js'
import store from '../../store'
import {Provider} from 'react-redux'
const Hotels = require('./HotelsList.json')

export default class HotelsLIst extends Component {
    static navigationOptions = {
        title:'Hotels'
    }
    constructor(props){
        super(props)
        this.state = {HotelResults:[]}
    }

    componentDidMount = () => {
    //   alert(Hotels.Status)
    if(Hotels.Status) this.setState({HotelResults : Hotels.Search.HotelSearchResult.HotelResults})
    };
    
    render() {
        let {HotelResults} = this.state
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                    <ScrollView style={{flex:1}}>
                        { HotelResults.map((hotel,id)=>
                        <HotelCard  hotel={hotel} key={id}   />
                        ) }
                    </ScrollView>
                   
                </View>
            </Provider>
            
        )
    }
}
