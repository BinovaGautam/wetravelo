import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import Dash from 'react-native-dash';
import DetailedCard from '../flights/DetailedCard'
import moment from 'moment'
import getSymbolFromCurrency from 'currency-symbol-map'
import QRCode from 'react-native-qrcode-svg';

const FlightTicket = (props) => {
    let {details} = props.data 
    const {darktext,dColor,lightGreen,lightTeal,grey,pink,silver} = props.strings
    let {JourneyList,PNR,PassengerDetails,Price,bookingTime} = details || {}
    let JourneyList1 = JSON.parse(JourneyList)
    let Jlist = details ? JourneyList1.FlightDetails.Details : []
    // let Adults = PassengerDetails.
    // PassengerDetails = PassengerDetails.push(PassengerDetails[0],PassengerDetails[0])
    let currSymb = getSymbolFromCurrency(Price.Currency)
    // PassengerDetails ... array of objects containing the details of the passengers
    return (
        <View style={{backgroundColor: '#fff',margin:20,minHeight:300,borderRadius:8}}>
             <View style={{flex:1,marginBottom:20}}>
                    {Jlist.map((details,index)=>
                        <View key={index}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{color:darktext,fontSize:16,fontWeight:'700',letterSpacing:1,margin:8}}>WeTravelo</Text>
                                <Text style={{color:dColor,fontSize:16,fontWeight:'700',letterSpacing:1,margin:8}}>PNR : {PNR} </Text>
                            </View>
                           {details.map((detail,id)=>{
                               let {Origin,Destination,OperatorName,OperatorCode,FlightNumber,CabinClass} = detail
                               let {DateTime}= Origin
                               return(
                                <View key={id} style={{padding:8}}>
                                    <View style={{flexDirection:'row',height:100}}>
                                            <View style={{flex:1,justifyContent:'center',}}>
                                               <Text style={{alignSelf:'center',textAlign:'center',color:pink,fontSize:26,fontWeight:'700',letterSpacing:1}}>{Origin.AirportCode} </Text>
                                               <Text style={{textAlign:'center',margin:5,fontSize:11, color:darktext,letterSpacing:0.8}}> {Origin.AirportName}  </Text>
                                               <Text style={{textAlign:'center',margin:5,fontSize:11, color:dColor,letterSpacing:0.8}}> {Origin.Terminal}  </Text>
                                            </View>

                                         <View style={{flex:1,justifyContent:'center'}}>
                                            <Image source={require('../assets/Images/planeticket.png')} style={{height:45,width:100,alignSelf:'stretch'}}/>
                                         </View>

                                         <View style={{flex:1,justifyContent:'center'}}>
                                            <Text style={{alignSelf:'center',textAlign:'center',color:pink,fontSize:26,fontWeight:'700',letterSpacing:1}}>{Destination.AirportCode} </Text>
                                            <Text style={{textAlign:'center',margin:5,fontSize:11, color:darktext,letterSpacing:0.8}}> {Destination.AirportName}  </Text>
                                            <Text style={{textAlign:'center',margin:5,fontSize:11, color:dColor,letterSpacing:0.8}}>  {Destination.Terminal}  </Text>
                                         </View>
                                        </View>
                                    

                                    <View style={{height:70,backgroundColor: pink,flexDirection:'row',borderRadius:5}}>
                                        <View style={{flex:1,justifyContent: 'center',}}>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:14,fontWeight:'700',letterSpacing:0.8}}>{OperatorName} </Text>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:18,fontWeight:'700',letterSpacing:1}}>{OperatorCode} | {FlightNumber} </Text>
                                        </View>

                                        <View style={{flex:1,justifyContent: 'center',}}>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:14,fontWeight:'700',letterSpacing:0.8}}>Cabin-Class </Text>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:18,fontWeight:'700',letterSpacing:1}}>{CabinClass}  </Text>
                                        </View>


                                        <View style={{flex:1,justifyContent: 'center',}}>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:14,fontWeight:'700',letterSpacing:0.8}}>{moment(DateTime).format('YYYY')} </Text>
                                            <Text style={{textAlign:'center',color:'#fff',fontSize:18,fontWeight:'700',letterSpacing:1}}>{moment(DateTime).format('DD')} {moment(DateTime).format('MMM')} </Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                                      {  [Origin,Destination].map((item,itemid) => 
                                        <View key={itemid} style={{justifyContent:'center',alignSelf:'center',flex:1}}>
                                                    <Text style={{fontWeight:'700',letterSpacing:1,color:darktext,textAlign:'center' ,fontSize:22}}>{moment(item.DateTime).format('hh:mm A')} </Text>
                                                    <Text style={{fontWeight:'500',letterSpacing:1,color:lightTeal,textAlign:'center' ,fontSize:11}}>{itemid ? 'ARRIVAL' : 'DEPARTURE'} </Text>
                                                    <Text style={{fontWeight:'500',letterSpacing:1,color:lightTeal,textAlign:'center' ,fontSize:11}}>{item.AirportName} </Text>
                                                    <Text style={{fontWeight:'500',letterSpacing:1,color:lightTeal,textAlign:'center' ,fontSize:11}}>{item.Terminal} </Text>
                                        </View>
                                      )}
                                    </View>
                                </View>
                               )
                           })}
                        </View>)}

                     
                        {/* PassengersDetails Goes here  */}

                        <Text style={{fontSize:18,fontWeight:'700',color:darktext,margin:8,letterSpacing:1}}>Passengers</Text>
                        {
                            PassengerDetails ? 
                              PassengerDetails.map((passenger,id) =>{
                                  let {FirstName,LastName,PassengerId,PassengerType} = passenger

                                  return(
                                    <View key={id} style={{flexDirection:'row',margin:5,marginHorizontal:15}}>
                                       <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                                           <Text style={{fontWeight:'700',color:darktext,margin:5}}>{FirstName} {LastName} </Text>
                                           <View style={{backgroundColor: silver,borderRadius:4,justifyContent:'center'}}>
                                               <Text style={{color:dColor,textAlign:'center',margin:5}}>{PassengerType} </Text>
                                           </View>
                                       </View>

                                       <Text style={{fontWeight:'500',color:lightTeal,textAlign:'center',alignSelf:'center',margin:8,marginLeft:15}}>ID: {PassengerId} </Text>
                                    </View>
                                  )
                              })
                            :null
                        }
             </View>

             <View style={{height:40,flexDirection:'row'}}>
                 <View style={{backgroundColor: grey,height:40,width:40,borderRadius:20,left:-20}}/>
                 <Dash dashColor={grey} style={{flex:1, height:1,alignSelf:'center',marginHorizontal:-20}}/>
                 <View style={{backgroundColor: grey,height:40,width:40,borderRadius:20,right:-20}}/>
             </View>

             <View style={{minHeight:100,flexDirection:'row',margin:10}}>
                 <View style={{flex:3,alignSelf:'center',justifyContent:'center'}}>
                     <Text style={{fontWeight:'700',color:dColor,fontSize:28,margin:8,letterSpacing:1}}>{currSymb} {Price.TotalDisplayFare} </Text>
                     <Text style={{fontWeight:'500',color:dColor,fontSize:11,}}>BookingDate : {moment(bookingTime).format("DD-MM-YYYY")} </Text>
                     <Text style={{fontWeight:'500',color:dColor,fontSize:11,}}>BookingTime : {moment(bookingTime).format("HH:MM A")} </Text>
                 </View>

                 <View style={{flex:2,justifyContent:'center',alignSelf:'center',alignContent:'center'}}>
                 <QRCode  value={PNR}/>
                 </View>

             </View>
        </View>
    )
}



export default FlightTicket
