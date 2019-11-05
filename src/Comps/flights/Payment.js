import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,StyleSheet} from 'react-native'
import { Icon ,Card,CardItem,Right,CheckBox,Body,ListItem,Form, Item, Input, Label} from 'native-base'
import { iOSUIKit } from 'react-native-typography'
import Snackbar from 'react-native-snackbar'
import {strings, Loader} from '../assets'
import DetailCard from './DetailCard'
import MultipleCard from './MultipleCard'
import axios from 'axios'
let updatedData = require('./FareQoute.json')
// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal,silver} = strings


export default class Payment extends Component {
    static navigationOptions = { 
        title:''
    }

    constructor(props){
        super(props)
        this.state ={
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
        let data = navigation.getParam('JourneyList',updatedData.UpdateFareQuote.FareQuoteDetails.JourneyList)
        let Passengers = navigation.getParam('Passengers',null)
        this.setState({data,Passengers})
        
    }
    
    getList =(list,id) =>{
        let {travellers} = this.state
        travellers[id].list =  list
        this.setState({list})

    }

    book = () =>{
        let {Passengers,data} = this.state
        let {ResultToken} = data
        let {navigation} = this.props
        if(ResultToken && Passengers) {
            let obj = {AppReference:'BIN12-154127-883271',SequenceNumber:0,ResultToken,Passengers}
            this.setState({loading:true})
            axios({
                url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/CommitBooking',
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
                BookingDetails ?  navigation.navigate('Confirmation',{BookingDetails}) : null
                if(!BookingDetails){
                    alert('Failed Try Again')
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
        let ios = Platform.OS === 'ios' ? true : false
        let {travellers,submit,phone,email,data,loading} =  this.state
        let {Price} = data ? data : {}
        let {PassengerBreakup,PriceBreakup,TotalDisplayFare,ResultToken} = Price ? Price : {}
        let travellersCount = 0
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {loading ? <Loader/> : null}
                {data ? 
                   <View style={{flex:1}}>
                       <ScrollView style={{flex:1}}>
                   
                   <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                       <Text style={{color:dColor,margin:8}}>Step 4 of 4</Text>
                       <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5} ]}>Review and Book</Text>
                      
                      
                       <Text style={[{fontSize:20,fontWeight:'500' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
                           RoundTrip type of journey.</Text>
                       
                       
                        <MultipleCard data={data}/>

                        <View style={{height:0.5,backgroundColor:'#ddd'}}/>

                        <Text style={[{fontSize:20,fontWeight:'500' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
                           Travellers</Text>
                           {
                               Object.keys(PassengerBreakup).map((key)=>{
                                   let passenger = PassengerBreakup[key]
                                   let {PassengerCount} = passenger
                                   travellersCount += parseInt(PassengerCount)
                                   let text = key == 'ADT' ? PassengerCount > 1 ? 'Adults' : 'Adult' : key == 'CHD' ? PassengerCount > 1 ? 'Children' : 'Child' : PassengerCount > 1 ? 'Infants' : 'Infant'
                                   return(
                                     <View key={key} style={{margin:5,flexDirection:'row',marginLeft:8,padding:3}}>
                                             <View style={{margin:3,backgroundColor:silver,justifyContent:'center',borderRadius:4,height:35,width:45,flexDirection:'row'}}>
                                                 <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',alignSelf:'center',marginRight:3}}>  {PassengerCount} </Text>
                                             </View>
                                              
                                             <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8,alignSelf:'center'}}> {text} </Text>
                                            
                                     </View>
                                   )
                               })
                           }
                            {/* <View style={{height:0.5,backgroundColor:'#ddd'}}/> */}


                          <TouchableOpacity activeOpacity={0.8} style={{borderWidth:1,borderRadius:0,borderColor:lightTeal,justifyContent:'center',padding:10,marginVertical:18}}>
                              <Text style={{fontSize:18,fontWeight:'600',color:lightTeal,textAlign:'center'}}>Apply Promo Code</Text>
                          </TouchableOpacity>


                       
                        <Text style={[{fontSize:20,fontWeight:'500' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,marginVertical:18} ]}>
                           Fare Break Down</Text>

                           <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                               <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Basic Fare</Text>
                               <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>

                               ₹ {parseInt(PriceBreakup.BasicFare)} </Text>
                           </View>

                           <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                               <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Taxes</Text>
                               <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>
                                   
                               ₹ {parseInt(PriceBreakup.Tax)} </Text>
                           </View>

                           <View style={{margin:5,flexDirection:'row',justifyContent:'space-between'}}>
                               <Text style={{fontSize:16,fontWeight:'500' ,color:darktext,margin:8}}>Service Charges</Text>
                               <Text style={{fontSize:16,fontWeight:'600' ,color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',textAlign:'left',width:80,margin:8}}>
                                   
                               ₹ 0 </Text>
                           </View>
                       

                   </View>
                  
                     
                     

             </ScrollView>
                    <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center',marginLeft:5}}>
                            <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {parseInt(Price.TotalDisplayFare)} </Text>
                            <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellersCount}  {travellersCount > 1 ?'TRAVELLERS' : 'TRAVELLER'}</Text>
                        </View>
                        <TouchableOpacity  activeOpacity={0.8} onPress={this.book}
                        style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                            <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18}}>BOOK</Text>
                        </TouchableOpacity>
                    </View>
                   </View>
                :

                <Loader/>
                
                
                }
                
               
            </View>
        )
    }
}


const styles = StyleSheet.create({

})