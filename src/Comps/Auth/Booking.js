import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity,TextInput,ScrollView,Dimensions,Image} from 'react-native'
import {strings, Loader} from '../assets'
import firestore from '@react-native-firebase/firestore'
import {connect} from 'react-redux'
import { Icon} from 'native-base';

let {dColor,darktext,lightTeal,pink,silver} = strings
const {width,height} = Dimensions.get('screen')
const ios = Platform.OS === 'ios' ? true : false

 class Booking extends Component {
    constructor(props){
        super(props)
        this.state={submit: false,loading:true}
    }

    componentDidMount = async() => {
        let {authstate} = this.props
        
        if(authstate.islogged){
           
            let {user,userDetail} = authstate
            let uid = user.uid
            // alert(uid)
            this.setState({...authstate,uid})

            let flights = await firestore().collection('flightBookings').where('uid',"==",uid).get()
             let flightDocs = flights ? flights.docs.map((doc) => doc.data()) : []
             

            let Hotels = await firestore().collection('HotelBookings').where('uid',"==",uid).get()
            let HotelDocs = Hotels ? Hotels.docs.map((doc) => doc.data()) : []

            let Buses = await firestore().collection('BusBookings').where('uid',"==",uid).get()
            let BusDocs = Buses ? Buses.docs.map((doc) => doc.data()) : []

           let combined = flightDocs.concat(HotelDocs).concat(BusDocs)
           this.setState({combined,loading:false})
            // console.warn(this.state)
        }
    }
    
    
  
    render() {
        let {submit,combined,loading} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor: "#fff",}}>
                <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:10,letterSpacing:1.5} ]}>Bookings</Text>
                 {loading ? <Loader /> : 
                    <ScrollView style={{flex:1}}>
                        { combined.length ?
                        combined.map((single,id)=>{
                            return(
                                <View style={{marginHorizontal:10,backgroundColor: '#f5f5f5',}}>
                                <Text style={{textAlign:'right',margin:10,color:lightTeal}}> 26 Nov</Text>
                                <Text style={{margin:10,fontWeight:'500',color:darktext,letterSpacing:1,fontSize:16}}>
                                                        Thank you for signing Up, You have got ₹500 as signing up bonus. Go to the Wallet inorder to see the balance.
                                                        </Text>
                                </View>
                            )
                        })
                      
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

const mapStateToProps = (state, ownProps) => {
    return {
       authstate : state.auth
    }
}

export default connect(mapStateToProps)(Booking) 