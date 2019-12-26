import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import HolidaysCat from './HolidaysCat'
import SingleCat from './SingleCat'
import Options from './Options'


let ios = Platform.OS === 'ios' ? true : false



let HolidayStack = createStackNavigator({
   HolidaysCat :  HolidaysCat,
   Options : Options,
   SingleCat : SingleCat,
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0,
            elevation : 0
        }
    }
})

export default HolidayStack;