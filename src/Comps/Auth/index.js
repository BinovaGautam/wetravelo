import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import Signup from './Signup'
import Signin from './Signin'
import Notifications from './Notifications'
import Account from '../Tabs/Account'
import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import { Icon } from 'native-base'
import Profile from './Profile'
import Booking from './Booking'
import BookingDetails from './BookingDetails'

let ios = Platform.OS === 'ios' ? true : false




let AuthStack = createStackNavigator({
//    AccountScreen : Account,
   Bookings : Booking,
   BookingDetails : BookingDetails,
   Profile : Profile,
   SignIn : Signin,
   SignUp : Signup,
   Notifications : Notifications,
},{
    defaultNavigationOptions:({navigation}) =>{ 
        const route = navigation.state.routeName;
        let topScreen = ['Bookings','Profile','Notification'].includes(route)
        return{
        headerStyle:{
            elevation:0,
            marginTop: !ios ? 24 :0
        },
        
        
        headerLeft:  <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} onPress={()=>topScreen ? navigation.navigate('Account') : navigation.goBack()}  activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} />
                    </TouchableOpacity>
    }}
})

export default AuthStack;