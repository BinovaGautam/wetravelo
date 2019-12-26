import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,StyleSheet} from 'react-native'
import { Icon ,Card,CardItem,Right,CheckBox,Body,ListItem,Form, Item, Input, Label} from 'native-base'
import Snackbar from 'react-native-snackbar'
import {strings, Loader} from '../assets'
import axios from 'axios'
import { uuid } from 'uuidv4';
import HTML from 'react-native-render-html';
// import HTML from 'react-native-render-html';
// let BlockRoom = require('./BlockRoom.json')

let {dColor,darktext,lightTeal,silver} = strings
let ios = Platform.OS === 'ios' ? true : false

export default class ReviewBooking extends Component {
    static navigationOptions = { 
        title:''
    }

    constructor(props){
        super(props)
        this.state ={
            travellers :  [
                                {title:'Adults',name:'AdultCount',list:[{FirstName:'Binova'}],value : 1,description:'Ages Above 12 Years'},
                                {title:'Children',name:'ChildCount',list:[{FirstName:'aliya'}],value : 1,description:'Ages 2 - 12 Years'},
                            ]
        }
    }

    componentDidMount() {
        let {navigation} = this.props
        let data = navigation.getParam('BlockRoomResult',null)
        // let data = BlockRoom.BlockRoom.BlockRoomResult
        console.warn(data)
        this.setState({data})
        
    }
    
   

    book = () =>{
        // let {Passengers,data} = this.state
        // let {ResultToken} = data
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        let {BlockRoomResult,ResultToken,PassengerDetails} = navparams
        let {BlockRoomId} = BlockRoomResult
        if(ResultToken && BlockRoomId) {
            let obj = {AppReference:uuid(),BlockRoomId,ResultToken,RoomDetails:[{PassengerDetails}]} //currently for only one room booking
            this.setState({loading:true})
            console.warn(obj)
            axios({
                url: 'http://test.services.travelomatix.com/webservices/index.php/hotel_v3/service/CommitBooking',
                method: 'POST',
                headers: 
                { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'x-Password': 'test@229',
                    'x-system': 'test',
                    'x-DomainKey': 'TMX1512291534825461',
                    'x-Username': 'test229267' },
                data:obj,
                json: true })
                .then(response =>{
                console.log('waiting.....')
                console.warn(response.data)
                // console.log(response.data); // ex.: { user: 'Your User'}
                // console.log(response.status,'hello',response.data.Search.FlightDataList.JourneyList[0].length); // ex.: 200
                let BookingDetails = response.data.Status ?  response.data.CommitBooking.BookingDetails : null
                // if(JourneyDetails.length) this.setState({type:'RoundTrip'})
                BookingDetails ?  navigation.navigate('ConfirmBook',{BookingDetails}) : null
                if(!BookingDetails){
                    alert(response.data.Message || 'Failed Try Again')
                    this.setState({loading:false})
                }
        
                console.log(response.data)
                }).catch(err =>{
                    console.log(err)
                })
        }else{
            alert('Something went wrong')
        }
    }
    
    

    render() {
        let {navigation} = this.props
        // let data = navigation.getParam('data',{})
       
        let {travellers,submit,phone,email,data,loading} =  this.state
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {loading ? <Loader/> : null}
                {data ? 
                <BookingDetails book={this.book} data={data}/>
                      :

                <Loader/>
                
                
                }
                
               
            </View>
        )
    }
}


BookingDetails = props =>{
    let {data,book} = props
   
    let {RoomTypeName,RoomDescription,Price,CancellationPolicy} = data ? data.HotelRoomsDetails[0] : {}
    let {TBO_RoomPrice,Tax,OfferedPriceRoundedOff} = Price ? Price : {}
    
    return(
        <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
    
    <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
        <Text style={{color:dColor,margin:8}}>Step 4 of 4</Text>
        <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5} ]}>Review and Book</Text>
       
       
        <Text style={[{fontSize:20,fontWeight:'500' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
        RoomTypeName</Text>
        

         <View style={{height:0.5,backgroundColor:'#ddd'}}/>
         <Text style={[{fontSize:20,fontWeight:'500' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
            Fare Break Down</Text>

            <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Basic Fare</Text>
                <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>

                ₹ {parseInt(OfferedPriceRoundedOff)} </Text>
            </View>

            <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Taxes</Text>
                <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>
                    
                ₹  {parseInt(Tax)} </Text>
            </View>

            <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Service Charges</Text>
                <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>
                    
                ₹ 0 </Text>
            </View>
        


            <TouchableOpacity activeOpacity={0.8} style={{borderWidth:1,borderRadius:0,borderColor:lightTeal,justifyContent:'center',padding:10,marginVertical:18}}>
               <Text style={{fontSize:18,fontWeight:'600',color:lightTeal,textAlign:'center'}}>Apply Promo Code</Text>
           </TouchableOpacity>


         <HTML html={"<div style='letter-spacing:0.8'>"+ RoomDescription + '</div>'} containerStyle={{padding:8,letterSpacing:1}} imagesMaxWidth={Dimensions.get('window').width} />
          
             {/* <View style={{height:0.5,backgroundColor:'#ddd'}}/> */}


     


        
      

    </View>
   
      
      

</ScrollView>
     <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
         <View style={{flex:1,justifyContent:'center',marginLeft:5}}>
             <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {OfferedPriceRoundedOff} </Text>
             {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellersCount}  {travellersCount > 1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
         </View>
         <TouchableOpacity  activeOpacity={0.8} onPress={book}
         style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
             <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18,letterSpacing:1}}>BOOK</Text>
         </TouchableOpacity>
     </View>
    </View>

    )
}
 
const styles = StyleSheet.create({

})