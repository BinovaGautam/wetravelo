import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import SelectSeats from './SelectSeats'



let ios = Platform.OS === 'ios' ? true : false



let BusStack = createStackNavigator({
   SeatLayout :  SelectSeats,
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0
        }
    }
})

export default BusStack;