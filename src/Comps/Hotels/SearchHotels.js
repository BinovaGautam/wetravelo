import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import { Header, Icon } from 'native-base';
import axios from 'axios'
import Snackbar from 'react-native-snackbar'
import {strings,Loader} from '../assets'
// // import OffersSlide from './Offers/OffersSlide';
import {connect} from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
let {darktext,dColor,lightTeal} = strings


 class SearchHotels extends Component {
    static navigationOptions = ({navigation})=> ({
        header: null,
        // title:'Search Flight',
        headerLeft: <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} onPress={()=>navigation.navigate('Home')} />
                    </TouchableOpacity>
    })
    constructor(props){
        super(props)
        this.state= {...props.initialState,}
    }

    componentDidMount() {
        this.props.navigation.setParams({from : this.from , to : this.to , travelClass : this.travelClass,getDay : this.getDay})
        
    }

    getDay = (CheckInDate,CheckOutDate,NoOfNights) =>{
       this.props.setStore({CheckInDate,CheckOutDate,NoOfNights})
    }

    selectType = type =>{ //select flight type like oneway/return/multicity
        let {recent,uid,hotel,setStore} = this.props
        setStore({type})
        hotel.type = type
        recent.hotel = hotel
        firestore().collection('users').doc(uid).update({recent})
    }

    selectCity  = details =>{

        let {recent,setStore,uid,hotel} = this.props
        // console.warn(details)
        let {address_components} = details
        for (var i = 0; i < address_components.length; i++) {
            let addressType = address_components[i].types[0];
            // for the country, get the country code (the "short name") also
            if (addressType === "locality") {
                 city = address_components[i].long_name
     
              
                 this.setState({loading:true})
                firestore().collection('allcities').where('city_name','==',city).limit(1).get()
                .then(res => {
                    let citydetails = res.size ? res.docs[0].data() : null
                    this.setState({loading:false})
                    citydetails ? setStore({address:details,citydetails}) 
                    : alert('No Records Found For The Address Entered')
                })
               
            }
          }
        // this.setState({from :data})
        // flight.from = data       //changing the flight object from redux store
        // recent.flight = flight   // updating flight object inside parent recent object

        // firestore().collection('users').doc(uid).update({recent})
        // selectPort('from',data)
    }

   

    getGuests = (NoOfRooms,RoomGuests,NoOfGuests) => {
      this.setState({NoOfRooms,RoomGuests,NoOfGuests})
    }

    search = () =>{
        // alert(JSON.stringify(this.state))
        // if type multicity do it differently
       
            const {type,travellers,CabinClass,maxDate,count,citydetails,CheckInDate,CheckOutDate,NoOfGuests,NoOfRooms,NoOfNights} = this.props.initialState
                if(citydetails && CheckInDate && NoOfNights && NoOfGuests && NoOfRooms ){
                  
                        let data =  this.props.initialState
                            this.props.navigation.navigate('HotelsList',{...data})
                    

                }else{
                    let msg  =  citydetails  ? NoOfNights ? NoOfRooms ? '' : 'Specify Room & Guests' : 'Select Check-In Date' : 'Enter A City' 
                    Snackbar.show({
                        title: `${msg}`,
                        duration: Snackbar.LENGTH_SHORT
                    });
                }
                    
                

    }

    getSegment = (Segments) => {
        this.setState({Segments})
    }
    
    render() {
        const {type,travellers,CabinClass,maxDate,count,citydetails,CheckInDate,CheckOutDate,NoOfGuests,NoOfRooms} = this.props.initialState
        const {navigation} = this.props
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
        return (
            <View style={{marginTop:24,flex:1,backgroundColor: '#fff',}}>
                <StatusBar backgroundColor="#fff" translucent={true} barStyle="dark-content"/>
                <View style={{flexDirection:'row'}}>
                     <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Home')}  style={{height:50,width:50,justifyContent:'center',}}>
                         <Icon name="keyboard-backspace" type="MaterialCommunityIcons" style={{textAlign:'center',marginTop:15,color:darktext,fontSize:30}}/>
                     </TouchableOpacity>
                     <Options type={type} selectType={this.selectType} />
                 </View>
                 <ScrollView style={{flex:1,backgroundColor: '#f5f5f5',}}>
                    
                        <View style={{padding:8,backgroundColor: '#fff',}}>

                            <TouchableOpacity activeOpacity={0.8}  onPress = {() => navigation.navigate('Autocomplete',{action:this.selectCity})}
                                style={[styles.box,{margin:8}]}>
                                    <Text style={{fontWeight:'400', marginHorizontal:8,textAlign:'center'}}>CITY/AREA/LOCALITY</Text>
                                    
                                        <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1,textAlign:'center'}}>{citydetails ? citydetails.city_name :'SELECT CITY'}</Text>
                                      
                            </TouchableOpacity>




                            <TouchableOpacity activeOpacity={0.8}  onPress={()=>navigation.navigate('SelectDateRange',{getDay:this.getDay})}
                             style={[styles.box,{flexDirection:'row',margin:8}]}>

                                    <View  style={[{flex:1}]} >
                                        <Text style={{fontWeight:'400',marginHorizontal:8}}>CHECK-IN</Text>
                                        {CheckInDate ? 
                                        <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                            <Text style={{fontWeight:'700',fontSize:28,color:dColor,textAlign:'left'}}> {CheckInDate.format("DD")} </Text>
                                            <View style={{justifyContent:'center',flex:1,}}>
                                                    <Text style={{color:'#000',}}>{CheckInDate.format("MMM")} {CheckInDate.format("YYYY")}</Text>
                                                    <Text style={{color:darktext,}}>{weekdays[CheckInDate.day()]}</Text>
                                            </View>
                                        </View>
                                        :
                                        <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}> SELECT </Text>} 
                                    </View>


                                    <View  style={{flex:1}} >
                                    <Text style={{fontWeight:'400',marginHorizontal:8}}>CHECK-OUT</Text>
                                        {CheckOutDate ? 
                                        <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                            <Text style={{fontWeight:'700',fontSize:28,color:dColor,textAlign:'left'}}> {CheckOutDate.format("DD")} </Text>
                                            <View style={{justifyContent:'center',flex:1,}}>
                                                    <Text style={{color:'#000',}}>{CheckOutDate.format("MMM")} {CheckOutDate.format("YYYY")}</Text>
                                                    <Text style={{color:darktext,}}>{weekdays[CheckOutDate.day()]}</Text>
                                            </View>
                                        </View>
                                        :
                                        <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}> SELECT </Text>} 
                                </View>

                            </TouchableOpacity>

                                <TouchableOpacity  onPress={() => navigation.navigate('SelectGuests',{getGuests: this.getGuests})} style={[styles.box,{flexDirection:'row',margin:8}]}>

                                    <View activeOpacity={0.8} style={[{flex:1}]}>
                                        <Text style={{fontWeight:'400',marginHorizontal:8}}>ROOMS</Text>
                                        <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:28}}> 0{NoOfRooms} </Text>
                                    </View>


                                    <View activeOpacity={0.8} style={[{flex:1}]}>
                                        <Text style={{fontWeight:'400',marginHorizontal:8}}>GUESTS</Text>
                                        <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:28}}> 0{NoOfGuests} </Text>
                                    </View>

                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.8} onPress={this.search} style={{height:50,borderRadius:4,justifyContent:'center',backgroundColor: dColor,margin:10}}>
                                    <Text style={{fontWeight:'700',color:'#fff',textAlign:'center',fontSize:18,letterSpacing:1}}>SEARCH</Text>
                                </TouchableOpacity>

                        </View>
                    
                 </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    box : {height:70,backgroundColor:'#dff9fb',borderRadius:4,justifyContent:'center',marginTop:10,padding:5}
})

const Options = (props) =>{
    return(
        <View style={{marginTop:15,height:40,borderRadius:20,borderWidth:0,borderColor:dColor,flexDirection:'row',elevation:3,flex:1,justifyContent:'center',marginRight:20}}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('domestic')}
           style={{flex:1,justifyContent:'center',borderBottomLeftRadius:20,borderTopLeftRadius:20,borderRightWidth:0.5,borderColor:'#f5f5f5',backgroundColor:props.type == "domestic" ?lightTeal : '#fff'}}>
               <Text style={{color:props.type == 'domestic'? '#fff' :lightTeal,textAlign:'center'}}>DOMESTIC</Text>
           </TouchableOpacity>
          
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('international')}
           style={{flex:1,justifyContent:'center',borderBottomRightRadius:20,borderTopRightRadius:20,backgroundColor:props.type == "international" ?lightTeal : '#fff'}}>
               <Text style={{color:props.type == 'international'? '#fff' :lightTeal,textAlign:'center'}}>INTERNATIONAL</Text>
           </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        initialState : state.hotel,
        uid : state.auth.user.uid,
        recent : state.auth.userDetail.recent || {} ,  //recent searches
        hotel : state.hotel.recent || {}    //recent hotel search from firestore
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      setStore : (data) => dispatch({type:'ALTER_HOTEL',payload : {...data}}),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchHotels)