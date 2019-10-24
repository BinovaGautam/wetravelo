import React, { Component } from 'react'
import { Text, View ,Image,TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'


let dColor = "#026C70"

DetailCard = props =>{
    let {data,navigation} = props
    let details = data.FlightDetails.Details[0]
    let first = details[0]
    let last = details[details.length - 1]
    let price = data.Price
    let date  =  new Date(details[details.length-1].Destination.FATV - details[0].Origin.FDTV)
    let duration = last.Destination.FATV ?  ('0'+date.getHours()).substr(-2) + 'h ' + ('0'+date.getMinutes()).substr(-2)+'m' : ''
    let depart = new Date("2019-09-27 17:05:00")
    indigoImg = 'https://pbs.twimg.com/profile_images/1044172604511215616/uUJ06nkr_400x400.jpg',
    spicejetImg = 'https://lh3.googleusercontent.com/GpBflSe4aTVUKcoM7xVVk0gVMEETdYF3Y_r5cNuwKDFRjnbCdpxW9m-GtyzFueCR2ODK',
    airInImg = 'https://i.pinimg.com/originals/5f/9b/e5/5f9be5876eda5d373d7f91a8faf5e659.jpg'
    
    return(
        <View >
            
            <View style={{height:0.5,backgroundColor:'#ddd',marginTop:3}}></View>

            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('JourneyDetails',{data})}
             style={{flexDirection:'row',padding:8}}>
                <Image 
                    source={{uri : first.OperatorName == 'SpiceJet' ? spicejetImg : first.OperatorName == "Indigo" ? indigoImg  : airInImg}}
                        style={{height:35,width:35,alignSelf:'center'}}/>

                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500',textAlign:'center'}}>{first.Origin.DateTime.substr(-8,5)}</Text>
                    <Text style={{color:'#000',fontWeight:'500',textAlign:'center'}}>{first.Origin.CityName}</Text>
                    
                </View>

                <View style={{padding:10,justifyContent:'center'}}>
                    <Text style={{color:dColor,textAlign:'center',fontWeight:'500'}}>{duration}</Text>
                    <View style={{height:0.8,backgroundColor:dColor,margin:3}}/>
                    <Text style={{color:'#000',textAlign:'center'}}> 
                     {details.length - 1 ? details.length-1 + ` ${details.length > 2 ? 'Stops' : 'Stop'}` : 'Non-Stop'}
                    </Text>
                </View>


                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500',textAlign:'center'}}>{last.Destination.DateTime.substr(-8,5)}</Text>
                    <Text style={{color:'#000',fontWeight:'500',textAlign:'center'}}>{last.Destination.CityName}</Text>
                    
                </View>

                <Text style={{fontSize:20,color:'#000',fontWeight:'500',textAlign:'center',alignSelf:'center'}}>₹ {parseInt(price.TotalDisplayFare)} </Text>

                
            </TouchableOpacity>

            

           

            
        </View>
    )
}

MultipleCard = props =>{
    let {data} = props
    let fdetails = data.FlightDetails.Details
    let OperatorName = fdetails[0][0].OperatorName
    // let details = data.FlightDetails.Details[0]
    // let first = details[0]
    // let last = details[details.length - 1]
    let price = data.Price
    // let date  =  new Date(details[details.length-1].Destination.FATV - details[0].Origin.FDTV)
    // let duration = last.Destination.FATV ?  ('0'+date.getHours()).substr(-2) + 'h ' + ('0'+date.getMinutes()).substr(-2)+'m' : ''
    let depart = new Date("2019-09-27 17:05:00")
    indigoImg = 'https://pbs.twimg.com/profile_images/1044172604511215616/uUJ06nkr_400x400.jpg',
    spicejetImg = 'https://lh3.googleusercontent.com/GpBflSe4aTVUKcoM7xVVk0gVMEETdYF3Y_r5cNuwKDFRjnbCdpxW9m-GtyzFueCR2ODK',
    airInImg = 'https://i.pinimg.com/originals/5f/9b/e5/5f9be5876eda5d373d7f91a8faf5e659.jpg'
    
    return(
        <View >
            
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
                 let depart = new Date("2019-09-27 17:05:00")
                 let dur = details.reduce((a,b) =>{return a.Duration + b.Duration})
                //   if(!id) console.log(dur.Duration)
                //  debugger
                 return(
                    <View style={{flexDirection:'row',padding:8}}>

                        <View style={{margin:3,backgroundColor:dColor,justifyContent:'center',height:30,alignSelf:'center'}}>
                            <Text style={{fontSize:14,color:'#fff',margin:5}}> {id ? 'RETURN' : 'DEPART'} </Text>
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
            

           

            
        </View>
    )
}


export default DetailCard
