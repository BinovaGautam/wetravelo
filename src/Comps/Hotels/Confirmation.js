import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,StyleSheet,Animated,Easing} from 'react-native'
import { Icon ,Card,CardItem,Right,CheckBox,Body,ListItem,Form, Item, Input, Label} from 'native-base'
import Snackbar from 'react-native-snackbar'
import {strings} from '../assets'
import LottieView from 'lottie-react-native';
// let bookingData = require('./Booking.json')
// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal,silver} = strings

export default class Confirmation extends Component {
    static navigationOptions = { 
        title:''
    }

    constructor(props){
        super(props)
        this.state ={
            progress: new Animated.Value(0),
            travellers :  [
                                {title:'Adults',name:'AdultCount',list:[{FirstName:'Binova'}],value : 1,description:'Ages Above 12 Years'},
                                {title:'Children',name:'ChildCount',list:[{FirstName:'aliya'}],value : 1,description:'Ages 2 - 12 Years'},
                                {title:'Infants',name:'InfantCount',list:[],value : 0,description:'Under 2 Years'},
                            ]
        }
    }

    componentDidMount() {
        let {navigation} = this.props
        navigation.setParams({getList : this.getList})
        let data = navigation.getParam('BookingDetails',null)
        if(data) this.setState({data})

        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
          }).start();

          setTimeout(()=>this.setState({success:true}),1800)
        
    }
    
    getList =(list,id) =>{
        let {travellers} = this.state
        travellers[id].list =  list
        this.setState({list})

    }
    
    

    render() {
        let {navigation} = this.props
        // let data = navigation.getParam('data',{})
        let ios = Platform.OS === 'ios' ? true : false
        let {travellers,submit,phone,email,data,success} =  this.state
        let {booking_status,BookingId} = data ? data : {}
        let booked = booking_status == 'BOOKING_CONFIRMED'
        // let Jlist = data ? JourneyList.FlightDetails.Details : []
        let travellersCount = 0
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {success ?
                        <ScrollView style={{flex:1}}>
                
                        <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                             <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5} ]}>
                             {booked ? "Congratulations" : "On Hold"}</Text>
                           
                           
                            <Text style={[{fontSize:20,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
                                Your Booking Has Been Confirmed!</Text>
  
                                
                            
                            
                                {data ?
                                   <View style={{flex:1}}>
  
                                          <View  style={{margin:5,flexDirection:'row',marginLeft:8,padding:3}}>
                                                  <View style={{margin:3,backgroundColor:silver,justifyContent:'center',borderRadius:4,height:35,width:45,flexDirection:'row'}}>
                                                      <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',alignSelf:'center',marginRight:3}}>ID</Text>
                                                  </View>
                                                   
                                                  <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8,alignSelf:'center'}}> {booked ? BookingId : null} </Text>
                                                 
                                          </View>
  
                                          {/* <View  style={{margin:5,flexDirection:'row',marginLeft:8,padding:3}}>
                                                  <View style={{margin:3,backgroundColor:silver,justifyContent:'center',borderRadius:4,height:35,width:45,flexDirection:'row'}}>
                                                      <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',alignSelf:'center',marginRight:3}}>PNR</Text>
                                                  </View>
                                                   
                                                  <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8,alignSelf:'center'}}> {PNR} </Text>
                                                 
                                          </View> */}
  
                                      
                                         
                                   </View>
                                  
                          
                          : <Text>Loading</Text>}
  
                              <View style={{height:50}}/>
  
                        </View>
                       
                          
                          
  
                  </ScrollView>
             
                   :
                   <LottieView source={require('../assets/lottie/1708-success.json')} progress={this.state.progress} loop={false}  />
             
                   }

              
               
            
               
            </View>
        )
    }
}


const styles = StyleSheet.create({

})