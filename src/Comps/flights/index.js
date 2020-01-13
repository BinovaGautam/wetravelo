import {createStackNavigator} from 'react-navigation'
import React from 'react'
import {Platform} from 'react-native'
import SearchFlight from './SearchFLight'
import JourneyDetails from './JourneyDetails'
import SelectDate from './SelectDate'
import FlightList from './FlightList'
import SelectPort from './SelectPort'
import TravellerClass from './TravellerClass'
import CheckOut from './CheckOut'
import TravellerForm from './TravellerForm'
import SelectCountry from './SelectCountry'
import Booking from './DummyData/Booking'
import Payment from './Payment'
import Confirmation from './Confirmation'
import { Icon } from 'native-base'
import ReturnDetails from './ReturnDetails'
import MasterList from './MasterList'
import ServicesNav from './ExtraServices'


let ios = Platform.OS === 'ios' ? true : false



let FlightStack = createStackNavigator({
    // SearchFlight: SearchFlight,
    // FlightList : FlightList,
    // Confirmation: Confirmation,
    // Payment : Payment,
    // Booking : Booking,
    ExtraServices : ServicesNav,
    CheckOut : CheckOut,
    MasterList : MasterList,
    TravellerForm : TravellerForm,
     SelectCountry: SelectCountry,
      SelectPort : SelectPort,
    TravellerClass : TravellerClass,
     SelectDate: SelectDate,
    JourneyDetails : JourneyDetails,
    ReturnDetails : ReturnDetails
},
{
    defaultNavigationOptions : ({navigation}) =>{
        return{
            headerStyle:{
                marginTop: !ios ? 24 :0,
                elevation:0
            },
            headerRight: <Icon name="home" type="Octicons" style={{margin:8,marginRight:12,}} onPress={()=> navigation.navigate('Home')} />
        }
    }
}
)


export default FlightStack;