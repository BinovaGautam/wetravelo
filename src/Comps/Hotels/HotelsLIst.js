import React, { Component } from 'react'
import { Text, View , StatusBar,ScrollView,TouchableOpacity } from 'react-native'
import HotelCard from './HotelCard.js'
import store from '../../store'
import {Provider} from 'react-redux'
import {Icon} from 'native-base'
import {isPointWithinRadius} from 'geolib'
import axios from 'axios'
import LottieView from 'lottie-react-native';
import {strings} from '../assets'

let {dColor,darktext} = strings

// const Hotels = require('./HotelsList.json')


export default class HotelsLIst extends Component {
    static navigationOptions = ({navigation}) => ({
        title:'Hotels',
       })
    constructor(props){
        super(props)
        this.state = {HotelResults:[],loading:true}
    }

    check = (a,b,c) =>{
        return a+b === c
    }

    getHotelsList = async() =>{
         let {navigation}  = this.props
         let navparams =  navigation.state.params || {}
          let {citydetails,address,CheckInDate,NoOfNights,RoomGuests,GuestNationality,NoOfRooms} = navparams
         let {city_code,country_code} = citydetails 
         let {lat,lng} = address.geometry.location
         let date = new Date(CheckInDate)
         let chekin_date =`${date.getDate()}-${date.getMonth()+1}- ${date.getFullYear()}`
           let data = {
                CheckInDate: chekin_date ||  "27-11-2019",
                NoOfNights: NoOfNights || 2,
                CountryCode: country_code || "IN",
                CityId: parseInt(city_code) || 6743,
                GuestNationality: GuestNationality || "IN",
                NoOfRooms: NoOfRooms || 1,
                RoomGuests: [
                  RoomGuests
                ]
        }

        // alert(JSON.stringify(data))
      
            axios({
                url: 'http://test.services.travelomatix.com/webservices/index.php/hotel_v3/service/Search',
                method: 'POST',
                headers: 
                { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'x-Password': 'test@229',
                    'x-system': 'test',
                    'x-DomainKey': 'TMX1512291534825461',
                    'x-Username': 'test229267' },
                data:data,
                json: true })
                .then(response =>{
                console.log('waiting.....')
                 let Hotels = response.data
                //  alert(JSON.stringify(Hotels))
                 if(Hotels.Status){
                    let HotelResults = Hotels.Search.HotelSearchResult.HotelResults
                    HotelResults = HotelResults.filter((hotel)=> {
                      let bool = isPointWithinRadius(
                        { latitude: parseFloat(hotel.Latitude), longitude: parseFloat(hotel.Longitude)},
                        { latitude: lat || 12.95967, longitude: lng || 77.64886 },
                        5000
                    )
                   return bool
                  }
                    )
                    // this.setState({HotelResults,loading:false })
                    // navigation.navigate('HotelDetails',{data:HotelResults[5]})
                }else{
                    alert('Internal Server Error.')
                    this.setState({loading:false})
                }
                }).catch(err =>{
                      alert(JSON.stringify(err))
                })
        
    }

    componentDidMount = () => {
    //   alert(Hotels.Status)

     this.getHotelsList()
    };
    
    render() {
        let {HotelResults,loading} = this.state
        let {navigation} = this.props
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                    {!loading ? HotelResults.length  ?
                        <ScrollView style={{flex:1}}>
                            { HotelResults.map((hotel,id)=>
                            <HotelCard navigation={navigation}  hotel={hotel} key={id}   />
                            ) }
                        </ScrollView>
                     : 
                     <View style={{flex:1,justifyContent:'center'}}>
                         <Text style={{marign:10,textAlign:'center',color:darktext,fontSize:24,fontWeight:'500',letterSpacing:0}}>
                             No Hotels Found In The Area You Are Looking For.
                         </Text>
                     </View>
                    : <LottieView source={require('../assets/lottie/10398-plane-window.json')} autoPlay loop />
                }
                    

                        </View>
            </Provider>
            
        )
    }
}
