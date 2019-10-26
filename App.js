import {createAppContainer,createStackNavigator,createSwitchNavigator,createBottomTabNavigator} from 'react-navigation'
// import FlightList from './src/flights/FlightList';
import {View,Text} from 'react-native'
import React from 'react'
import FlightList from './src/Comps/flights/FlightList';
import Home from './src/Comps/Tabs/Home';
import SearchPlace from './src/Comps/Location/SearchPlace';
import SearchFlight from './src/Comps/flights/SearchFLight';
import FlightStack from './src/Comps/flights';
import HotelStack from './src/Comps/Hotels';

// const Home = () => <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>home</Text> </View>

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Profile: Home,
  Wallet : Home
},{
  navigationOptions : {header:null}
})

const App = createStackNavigator({
  
  // Home : TabNavigator,
  // Autocomplete : SearchPlace,
  Hotels : HotelStack,
  Flights : FlightStack
},{
  defaultNavigationOptions:{
    header:null
  }
})

export default createAppContainer(App)
