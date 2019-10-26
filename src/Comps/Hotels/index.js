import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import HotelsLIst from './HotelsLIst'


let ios = Platform.OS === 'ios' ? true : false



let HotelStack = createStackNavigator({
    HotelsList : HotelsLIst
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0
        }
    }
})

export default HotelStack;