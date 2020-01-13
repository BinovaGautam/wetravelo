import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity,TextInput,ScrollView,Dimensions,Image} from 'react-native'
import {strings, Loader} from '../assets'
import firestore from '@react-native-firebase/firestore'
import {connect} from 'react-redux'
import { Icon} from 'native-base';
import moment from 'moment'

let {dColor,darktext,lightTeal,pink,silver,grey} = strings
const {width,height} = Dimensions.get('screen')
const ios = Platform.OS === 'ios' ? true : false

 class Booking extends Component {
     static navigationOptions ={
         title : 'Bookings'
     }
    constructor(props){
        super(props)
        this.state={submit: false,loading:true}
    }

    componentDidMount = async() => {
        let {authstate,navigation} = this.props
        
        if(authstate.islogged){
           
            let {user,userDetail} = authstate
            let uid = user.uid
            // alert(uid)
            this.setState({...authstate,uid})

            let flights = await firestore().collection('flightBookings').where('uid',"==",uid).get()
             let flightDocs = flights ? flights.docs.map((doc) => { return {details:doc.data(),type:'flight'}}) : []
            
            let Hotels = await firestore().collection('HotelBookings').where('uid',"==",uid).get()
            let HotelDocs = Hotels ? Hotels.docs.map((doc) => { return{details:doc.data(),type:'hotel'}}) : []

            let Buses = await firestore().collection('BusBookings').where('uid',"==",uid).get()
            let BusDocs = Buses ? Buses.docs.map((doc) => { return{details:doc.data(),type:'bus'}}) : []

           let combined = flightDocs.concat(HotelDocs).concat(BusDocs)
           this.setState({combined,loading:false})
            // console.warn(this.state)
          
        }
    }
    
    
  
    render() {
        let {submit,combined,loading} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor:grey,}}>
                <StatusBar backgroundColor="#fff" translucent={true} barStyle = 'dark-content'/>
                {/* <Text style={[{fontSize:32 ,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:10,letterSpacing:1.5} ]}>Bookings</Text> */}
                 {loading ? <Loader /> : 
                    <ScrollView style={{flex:1}}>
                        { combined.length ?
                        combined.map((single,id)=>
                         single.type === 'flight' ? <FlightComp data = {single} key={id} navigation={navigation}/> :
                         single.type === 'hotel' ? null : 
                         single.type === 'bus' ? null : null
                        )
                      
                        :
                        <View style={{height:height-100,justifyContent:'center'}}>
                            <Image style={{height:width,width:width}} source={require('../assets/Images/void.png')}/>
                            <Text style={{textAlign:'center',fontWeight:'500',color:darktext,fontSize:22,letterSpacing:1,margin:20}}>No Bookings Yet! </Text>
                        </View>
                        }
                    </ScrollView>
                }
                                

            </View>
        )
    }
}

FlightComp = props => {
    let {data,navigation} = props
    let {JourneyList,Pice,PNR,bookingTime} = data.details
    let JDetails = JSON.parse(JourneyList)
    let Jlist = JDetails.FlightDetails.Details[0]
    // console.warn(data)
    return(
        <TouchableOpacity  activeOpacity={0.8} onPress={() => navigation.navigate('BookingDetails',{data})}
         style={{margin:8,backgroundColor: '#fff',borderWidth:0.8,borderColor:silver,borderRadius:5 }}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              
            <Text style={{textAlign:'left',marginHorizontal:10,margin:8,color:darktext,fontWeight:'500',letterSpacing:1}}>{data.type.toUpperCase()} </Text>
            <Text style={{textAlign:'right',marginHorizontal:10,margin:8,color:lightTeal}}>BookedOn : {moment(bookingTime).format("DD MMM YYYY")}</Text>
          </View>
       
         <Text style={{color:darktext,fontSize:20,letterSpacing:1,marginHorizontal:10,fontWeight:'500',margin:8}}>{Jlist[0].Origin.AirportCode+' '}
            <Icon name="flight-takeoff" type="MaterialIcons" style={{marginHorizontal:12,color:lightTeal}} />
            {' '+ Jlist[Jlist.length-1].Destination.AirportCode} </Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
       authstate : state.auth
    }
}

export default connect(mapStateToProps)(Booking) 