import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import HotelsLIst from './HotelsLIst'
import HotelDetails from './HotelDetails'
import RoomList from './RoomList'
import SearchPlace from './SearchPlace'
import SelectDateRange from './SelectDateRange'
import SelectGuests from './SelectGuests'
import GuestDetails from './GuestDetails'
import GuestForm from './GuestForm'
import ReviewBooking from './ReviewBooking'
import Confirmation from './Confirmation'
import SearchHotels from './SearchHotels'
import RoomnGuests from './RoomnGuests'
import { RangePicker } from '../DatePicker'


let ios = Platform.OS === 'ios' ? true : false



let HotelStack = createStackNavigator({
    SearchHotels :RangePicker,
    SearchHotels :SearchHotels,
    Autocomplete : SearchPlace,
    HotelsList : HotelsLIst,
    GuestDetails : GuestDetails,
    GuestForm : GuestForm,
    RoomnGuests : RoomnGuests,
    SelectDateRange : SelectDateRange,
    SelectGuests : SelectGuests,
    HotelsList : HotelsLIst,
    HotelDetails : HotelDetails,
    RoomList: RoomList,
    ReviewBook : ReviewBooking,
    ConfirmBook : Confirmation
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0,
            elevation:0
        }
    }
})

export default HotelStack;