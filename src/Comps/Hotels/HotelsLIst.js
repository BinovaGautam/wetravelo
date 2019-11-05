import React, { Component } from 'react'
import { Text, View , StatusBar,ScrollView,TouchableOpacity } from 'react-native'
import HotelCard from './HotelCard.js'
import store from '../../store'
import {Provider} from 'react-redux'
import {Icon} from 'native-base'
import {isPointWithinRadius} from 'geolib'
const Hotels = require('./HotelsList.json')


export default class HotelsLIst extends Component {
    static navigationOptions = ({navigation}) => ({
        title:'Hotels',
        headerLeft: <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} onPress={()=>navigation.navigate('Home')} />
                    </TouchableOpacity>
    })
    constructor(props){
        super(props)
        this.state = {HotelResults:[]}
    }

    check = (a,b,c) =>{
        return a+b === c
    }

    componentDidMount = () => {
    //   alert(Hotels.Status)

    if(Hotels.Status){
        let HotelResults = Hotels.Search.HotelSearchResult.HotelResults
        HotelResults = HotelResults.filter((hotel)=> {
          let bool = isPointWithinRadius(
            { latitude: parseFloat(hotel.Latitude), longitude: parseFloat(hotel.Longitude)},
            { latitude: 12.95967, longitude: 77.64886 },
            5000
        )
       return bool
      }
        )
        this.setState({HotelResults })
        let {navigation} = this.props
        navigation.navigate('HotelDetails',{data:HotelResults[5]})
    }
    
    };
    
    render() {
        let {HotelResults} = this.state
        let {navigation} = this.props
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                    <ScrollView style={{flex:1}}>
                        { HotelResults.map((hotel,id)=>
                        <HotelCard navigation={navigation}  hotel={hotel} key={id}   />
                        ) }
                    </ScrollView>
                   
                </View>
            </Provider>
            
        )
    }
}
