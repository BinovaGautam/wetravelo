import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import { Icon } from 'native-base'
import {strings} from '../assets'

let {dColor,darktext,silver,lightTeal} = strings
DetailedCard = props =>{
    let {details,index} = props
    
    
    // let depart = new Date("2019-09-27 17:05:00")
    indigoImg = 'https://pbs.twimg.com/profile_images/1044172604511215616/uUJ06nkr_400x400.jpg',
    spicejetImg = 'https://lh3.googleusercontent.com/GpBflSe4aTVUKcoM7xVVk0gVMEETdYF3Y_r5cNuwKDFRjnbCdpxW9m-GtyzFueCR2ODK',
    airInImg = 'https://i.pinimg.com/originals/5f/9b/e5/5f9be5876eda5d373d7f91a8faf5e659.jpg'
    
    return(
       <View style={{flex:1}}>
           {details.map((detail,id)=>{
               let {Attr,Origin,Destination,Duration} = detail
               let depart = new Date(Origin.DateTime)
               let duration =  parseInt(Duration/60) +' H ' + parseInt(Duration%60)+' M'
            //    alert(JSON.stringify(Origin.DateTime))
               return(
                <View key={id} style={{margin:5,padding:5}}>

                    {id ?
                        <View style={{padding:5,margin:20,borderRadius:4,backgroundColor:"#f6e58d",justifyContent:'center'}}>
                            <Text style={{color:dColor,fontWeight:'500',textAlign:'center',fontSize:16}}>
                                Stopover in {Origin.Cityname || Origin.AirportCode}
                            </Text>
                        </View>
                        :null}
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:id ?'#000' :lightTeal,justifyContent:'center',paddingHorizontal:10,padding:8,}}>
                        <Text style={{fontSize:18,textAlign:'center',color:'#fff',fontWeight:'400'}}>{id ? ' NEXT   ' : index ? 'RETRUN' : 'DEPART'}</Text>
                        {/* <Text style={{textAlign:'center',color:'#fff',fontWeight:'500'}}>29 SEPT  </Text> */}
                    </View>
    
                    <View style={{padding:8,justifyContent:'center'}}>
                        <Text style={{fontSize:24,fontWeight:'500'}}> {detail.Origin.AirportCode} - {detail.Destination.AirportCode} </Text>
                        <Text>  {duration} | {detail.CabinClass} | {detail.AvailableSeats ? detail.AvailableSeats + ' seats available' :null} </Text>
                    </View>
                   
    
                </View>
                <View style={{height:0.5,backgroundColor:'#ddd',marginTop:10}}></View>
    
                <View style={{flexDirection:'row',padding:8}}>
                    <Image 
                        source={{uri : detail.OperatorName == 'SpiceJet' ? spicejetImg : detail.OperatorName == "Indigo" ? indigoImg  : airInImg}}
                            style={{height:35,width:35,alignSelf:'center'}}/>
    
                    <Text style={{margin:8,fontSize:16}}> {detail.OperatorName} | {detail.OperatorCode} {detail.FlightNumber} </Text>
    
                </View>
    
                <View style={{flexDirection:'row',padding:8}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:24,fontWeight:'500'}}>{Origin.DateTime.substr(-8,5)}</Text>
                        <Text style={{color:dColor}}>{Origin.DateTime.substr(0,10)} </Text>
                        <Text style={{color:'#000',fontWeight:'500'}}>{Origin.CityName}</Text>
                        <Text style={{color:'#000'}}>{Origin.AirportName} </Text>
                        <Text style={{color:dColor}}> {Origin.Terminal ? 'Terminal ' + Origin.Terminal : null} </Text>
                    </View>
    
                    <View style={{padding:10,justifyContent:'center'}}>

                        <Icon name="timer" type="MaterialCommunityIcons" style={{color:dColor,fontSize:35,textAlign:'center'}} />
                        <Text style={{color:dColor,textAlign:'center'}}>{duration}</Text>
                        {/* <Text style={{color:dColor,textAlign:'center'}}>{details.length - 1 ? details.length-1 + ` ${details.length > 2 ? 'Stops' : 'Stop'}` : 'Non-Stop'}</Text>
                         */}
                    </View>
    
    
                    <View style={{flex:1}}>
                        <Text style={{fontSize:24,fontWeight:'500',textAlign:'right'}}>{Destination.DateTime.substr(-8,5)}</Text>
                        <Text style={{color:dColor,textAlign:'right'}}>{Destination.DateTime.substr(0,10)}</Text>
                        <Text style={{color:'#000',textAlign:'right',fontWeight:'500'}}>{Destination.CityName}</Text>
                        <Text style={{color:'#000',textAlign:'right'}}>{Destination.AirportName} </Text>
                        <Text style={{color:dColor,textAlign:'right'}}>{Origin.Terminal ? 'Terminal ' + Origin.Terminal : null} </Text>
                    </View>
                </View>
    
                <View style={{flexDirection:'row'}}>
                    <Icon name="file-cabinet" type="MaterialCommunityIcons"/>
                    <Text style={{color:'#000',margin:5}}>Cabin  Bag  :</Text>
                    <Text style={{color:dColor,fontWeight:'500',margin:5}}>{Attr.CabinBaggage || 'No Info Available'} </Text>
                </View>
    
                <View style={{flexDirection:'row'}}>
                    <Icon name="briefcase-check" type="MaterialCommunityIcons"/>
                    <Text style={{color:'#000',margin:5}}>Check-in Bag :</Text>
                    <Text style={{color:dColor,fontWeight:'500',margin:5}}>{Attr.Baggage || 'No Info Available'}</Text>
                </View>
    
               
    
                
            </View>
               )
           })}
       </View>
    )
}


export default DetailedCard;