import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import HotelsLIst from './HotelsLIst'
import HotelDetails from './HotelDetails'
import RoomList from './RoomList'
import SearchPlace from './SearchPlace'
import SelectDateRange from './SelectDateRange'
import SelectGuests from './SelectGuests'


let ios = Platform.OS === 'ios' ? true : false



let HotelStack = createStackNavigator({
    
   Autocomplete : SearchPlace,
    SelectDateRange : SelectDateRange,
    SelectGuests : SelectGuests,
    HotelsList : HotelsLIst,
    HotelDetails : HotelDetails,
    RoomList: RoomList,
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0
        }
    }
})

export default HotelStack;