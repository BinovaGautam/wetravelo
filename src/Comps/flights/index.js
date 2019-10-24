import {createStackNavigator} from 'react-navigation'
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
import Booking from './Booking'
import Payment from './Payment'
import Confirmation from './Confirmation'


let ios = Platform.OS === 'ios' ? true : false



let FlightStack = createStackNavigator({
    SearchFlight: SearchFlight,
  FlightList : FlightList,
   
    Confirmation: Confirmation,
    Payment : Payment,
    Booking : Booking,
    CheckOut : CheckOut,
    TravellerForm : TravellerForm,
   
     SelectCountry: SelectCountry,
      SelectPort : SelectPort,
    TravellerClass : TravellerClass,
     SelectDate: SelectDate,
    JourneyDetails : JourneyDetails
},
{
    defaultNavigationOptions :{
        headerStyle:{
            marginTop: !ios ? 24 :0
        }
    }
}
)


export default FlightStack;