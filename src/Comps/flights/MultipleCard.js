import React, { Component } from 'react'
import { Text, View ,Image,TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'
import {strings} from '../assets'

let {dColor,silver,darktext} = strings




MultipleCard = props =>{
    let {data,navigation} = props
    let fdetails = data.FlightDetails.Details
    let OperatorName = fdetails[0][0].OperatorName
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
       
    let price = data.Price
    // let date  =  new Date(details[details.length-1].Destination.FATV - details[0].Origin.FDTV)
    // let duration = last.Destination.FATV ?  ('0'+date.getHours()).substr(-2) + 'h ' + ('0'+date.getMinutes()).substr(-2)+'m' : ''
    let depart = new Date("2019-09-27 17:05:00")
    indigoImg = 'https://pbs.twimg.com/profile_images/1044172604511215616/uUJ06nkr_400x400.jpg',
    spicejetImg = 'https://lh3.googleusercontent.com/GpBflSe4aTVUKcoM7xVVk0gVMEETdYF3Y_r5cNuwKDFRjnbCdpxW9m-GtyzFueCR2ODK',
    airInImg = 'https://i.pinimg.com/originals/5f/9b/e5/5f9be5876eda5d373d7f91a8faf5e659.jpg'
    
    return(
        <View >
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>navigation.navigate('JourneyDetails',{data})} >

            
            <View style={{height:0.8,backgroundColor:'#ddd',marginTop:3}}></View>
            <View style={{flexDirection:'row',marginHorizontal:15}}>
                <Image 
                    source={{uri : OperatorName == 'SpiceJet' ? spicejetImg : OperatorName == "Indigo" ? indigoImg  : airInImg}}
                        style={{height:35,width:35,alignSelf:'center'}}/>


                <View style={{padding:8,justifyContent:'center',flex:1}}>
                    <Text style={{fontSize:20,color:dColor
                    }}> {fdetails[0][0].OperatorName} </Text>
                    
                </View>

                <Text style={{fontSize:22,fontWeight:'500',alignSelf:'center',color:dColor}}> ₹ {parseInt(price.TotalDisplayFare)}</Text>
               

            </View>
            <View style={{height:0.5,backgroundColor:'#ddd',marginHorizontal:8}}></View>

            {fdetails.map((details,id)=>{
                 let first = details[0]
                 let last = details[details.length - 1]
                 let price = data.Price
                 let date  =  new Date(details[details.length-1].Destination.FATV - details[0].Origin.FDTV)
                 let duration = last.Destination.FATV ?  ('0'+date.getHours()).substr(-2) + 'h ' + ('0'+date.getMinutes()).substr(-2)+'m' : ''
                 let depart = new Date(first.Origin.DateTime)
                 let dur = details.reduce((a,b) =>{return a.Duration + b.Duration})
                //   if(!id) console.log(dur.Duration)
                //  debugger
                // let departTime = new Date(first.Origin.DateTime)
                // console.log(depart.getMonth())
                // let departString =  months[departTime.getMonth()]
                 return(
                    <View style={{flexDirection:'row',padding:8,marginVertical:18}}>

                        <View style={{margin:3,backgroundColor:silver,justifyContent:'center',alignSelf:'center',borderRadius:4,padding:8}}>
                            <Text style={{fontWeight:'600',color:darktext,margin:5}}> {id ? 'RETURN' : 'DEPART'} </Text>
                            {/* <Text style={{fontSize:14,color:'#fff',margin:5}}> {id ? first.Origin.DateTime : departString} </Text> */}
                        </View>
                    
    
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'500',textAlign:'center'}}> {first.Origin.DateTime.substr(-8,5)} </Text>
                        <Text style={{color:'#000',fontWeight:'500',textAlign:'center'}}> {first.Origin.CityName}</Text>
                        
                    </View>
    
                    <View style={{padding:10,justifyContent:'center'}}>
                        <Text style={{color:dColor,textAlign:'center',fontWeight:'500'}}> {dur.Duration} </Text>
                        <View style={{height:0.8,backgroundColor:dColor,}}/>
                        <Text style={{color:'#000',textAlign:'center'}}> 
                         {details.length - 1 ? details.length-1 + ` ${details.length > 2 ? 'Stops' : 'Stop'}` : 'Non-Stop'}
                        </Text>
                    </View>
    
    
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'500',textAlign:'center'}}>{last.Origin.DateTime.substr(-8,5)}</Text>
                        <Text style={{color:'#000',fontWeight:'500',textAlign:'center'}}>{last.Destination.CityName}</Text>
                        
                    </View>
    
                   
                    
                </View>
    
                 )

            })}
            

            </TouchableOpacity>
            

            
        </View>
    )
}


export default MultipleCard
