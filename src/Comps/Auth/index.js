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

let ios = Platform.OS === 'ios' ? true : false



let AuthStack = createStackNavigator({
//    AccountScreen : Account,
   Bookings : Booking,
   Profile : Profile,
   SignIn : Signin,
   SignUp : Signup,
   Notifications : Notifications,
},{
    defaultNavigationOptions:({navigation}) =>{ 
        return{
        headerStyle:{
            marginTop: !ios ? 24 :0
        },
        headerLeft:<TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} onPress={()=>navigation.navigate('Account')}  activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} />
                    </TouchableOpacity>
    }}
})

export default AuthStack;