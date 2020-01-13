import {createAppContainer,createStackNavigator,createSwitchNavigator,createBottomTabNavigator} from 'react-navigation'
// import FlightList from './src/flights/FlightList';
import {View,Text,TouchableOpacity} from 'react-native'
import React,{Component,useState} from 'react'
import {Provider,useDispatch,useSelector} from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import store from './src/store'
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
import BusStack from './src/Comps/Buses';
import HolidayStack from './src/Comps/Holidays';
let {dColor,darktext,lightTeal} = strings
import auth from '@react-native-firebase/auth'

// const Home = () => <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>home</Text> </View>

const TabNavigator = createBottomTabNavigator({

  Account:Account,
  Home: Home,
  Wallet : Wallet,
},{
  defaultNavigationOptions : {header:null},
  tabBarOptions: {
    activeTintColor: lightTeal,
    inactiveTintColor: darktext,
  }
})

const RootStack = createStackNavigator({
  
  Home : TabNavigator,
  Holidays : HolidayStack,
  Buses : BusStack,
  Hotels : HotelStack,
  Flights : FlightStack,
  AuthStack: AuthStack,
},{
  defaultNavigationOptions:{
    header:null,
   
  }
})

const Navigation = createAppContainer(RootStack)

RootComponent = () => {
  const [isloggedOut,setLoggedOut] = useState(false)
  const [launch,setLaunch] = useState(false)
  const dispatch = useDispatch()
  auth().onAuthStateChanged(user => {
    // console.warn(user)
    //  if(user) setLoggedOut(true)
    // ************** if user is null and loggedOut in is false ti shows new open... create anonymous user **************
    if(user){
          firestore().collection('users').doc(user.uid)
          .onSnapshot(res => {
            let userDetail =res.exists ? res.data() : {}
            let {recent} = userDetail
            dispatch({type:'USER_DETAIL',userDetail})
            setLaunch(true)
            // alert(true)
            //dispatch actions for ***** recent searches ***** from the app
            if(recent){
              if(recent.flight) dispatch({type:'INITIAL_DETAILS',payload:recent.flight}) 
            }
          })
    }
     if(!user && !isloggedOut){ 
       auth().signInAnonymously()
       .then(res => {
         setLoggedOut(true)
         dispatch({type : 'LOG_IN',user:res,islogged : res ? true : false}) 
       })
       .catch(err => console.log(err))
      }else{   //This case acts only when someone LogsOut
          dispatch({type : 'LOG_IN',user,islogged : user ? true : false}) 
      }

  
})
  
  return(
      <View style={{flex:1,backgroundColor: '#fff',justifyContent:'center'}}>
        {/* {
         launch ?
         <Text style={{fontWeight:'900',fontSize:30,color:'#000',textAlign:'center',letterSpacing:1.3}}>WETRAVELO</Text>
         :   <Navigation/>
                 }  */}
                 {launch ?
                  <Navigation/>
                  :
                  <Text style={{fontWeight:'900',fontSize:30,color:'#000',textAlign:'center',letterSpacing:1.3}}>WETRAVELO</Text>
                }
                
      </View>
      
     
   
  )
}

class App extends Component {

  render(){
    return(
      <Provider store={store}>
        <RootComponent/>
      </Provider>
    )
  }

}

export default App