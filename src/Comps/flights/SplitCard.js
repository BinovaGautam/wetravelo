import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import { Icon } from 'native-base'
import {strings} from '../assets'
import getDuration from '../assets/functions/getDuration'

let {dColor,darktext,silver,lightTeal,logoApi,eblue} = strings
SplitCard = props =>{
    let {data,navigation,onSelect,index,selection,selected, id ,isActive} = props
    let details = data.FlightDetails.Details[0]
    let first = details[0]
    let last = details[details.length - 1]
    let {Price,ResultToken} = data
    // let selectedToken =  selected ? selection.ResultToken : null
    // let isActive = ResultToken === selectedToken
    
    let duration = getDuration(first.Origin.DateTime,last.Destination.DateTime)
    return(
        <View style={{backgroundColor: '#fff',}}>
            
            <View style={{height:0.5,backgroundColor:'#ddd',marginTop:3}}></View>

            <TouchableOpacity activeOpacity={0.5}  onPress={()=>onSelect(index,data)}
             style={{flexDirection:'row',padding:8,backgroundColor: isActive ? eblue : 'transparent',}}>
                 <View style={{width:50,justifyContent:'center',}}>
                    <Image  source={{uri : logoApi+first.OperatorCode}} style={{height:30,width:50,alignSelf:'center',}}/>
                    <Text style={{color:darktext,fontWeight:'500',textAlign:'center',fontSize:10}}>{first.OperatorName}</Text>
                 </View>
                 
                 <View style={{flex:1}}>
                     <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontWeight:'500',textAlign:'center',color:darktext,fontSize:12}}>{first.Origin.DateTime.substr(-8,5)}</Text>
                            <Text style={{color:'#000',fontWeight:'500',textAlign:'center',fontSize:12}}>{first.Origin.AirportCode}</Text>
                            
                            </View>
                            <Icon name="ios-airplane" style={{alignSelf:'center',textAlign:'center',color:lightTeal,fontSize:18}}/>

                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={{color:darktext,fontSize:12,fontWeight:'500',textAlign:'center'}}>{last.Destination.DateTime.substr(-8,5)}</Text>
                                <Text style={{color:'#000',fontWeight:'500',textAlign:'center',fontSize:12}}>{last.Destination.AirportCode}</Text>
                                
                            </View>

                     </View>
                    
                     <View style={{flexDirection:'row',alignSelf:'center',}}>
                            <Text style={{textAlign:'center',fontWeight:'500',fontSize:11,fontWeight:'500',color:lightTeal}}> {duration} </Text>
                            <View style={{width:0.8,backgroundColor:lightTeal,margin:3}}/>
                            <Text style={{textAlign:'center',fontSize:11,fontWeight:'500',color:lightTeal}}> 
                            {details.length - 1 ? details.length-1 + ` ${details.length > 2 ? 'Stops' : 'Stop'}` : 'Non-Stop'}
                            </Text>
                    </View>
                    <Text style={{fontSize:14,color:darktext,fontWeight:'700',textAlign:'center',textAlign:'right'}}>₹ {parseInt(Price.TotalDisplayFare)}   </Text>

                 </View>
               
                
                
            </TouchableOpacity>

            

           

            
        </View>
    )
}


export default SplitCard
