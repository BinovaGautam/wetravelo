import {createAppContainer,createStackNavigator,createSwitchNavigator,createBottomTabNavigator} from 'react-navigation'
// import FlightList from './src/flights/FlightList';
import {View,Text,TouchableOpacity} from 'react-native'
import React from 'react'
import FlightList from './src/Comps/flights/FlightList';
import Home from './src/Comps/Tabs/Home';
import SearchFlight from './src/Comps/flights/SearchFLight';
import FlightStack from './src/Comps/flights';
import HotelStack from './src/Comps/Hotels';
import {strings} from './src/Comps/assets'
import Account from './src/Comps/Tabs/Account';
import Wallet from './src/Comps/Tabs/Wallet';
import {Icon} from 'native-base'
import AuthStack from './src/Comps/Auth';
let {dColor,darktext,lightTeal} = strings

// const Home = () => <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>home</Text> </View>

const TabNavigator = createBottomTabNavigator({

  Account: Account,
  Home: Home,
  Wallet : Wallet,
},{
  defaultNavigationOptions : {header:null},
  tabBarOptions: {
    activeTintColor: lightTeal,
    inactiveTintColor: darktext,
  }
})

const App = createStackNavigator({
  
  // Home : TabNavigator,
  Hotels : HotelStack,
  Flights : FlightStack,
  AuthStack: AuthStack,
},{
  defaultNavigationOptions:{
    header:null,
   
  }
})

export default createAppContainer(App)
