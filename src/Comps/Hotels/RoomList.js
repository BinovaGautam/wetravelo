import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity} from 'react-native'
import {strings, Loader} from '../assets'

let {dColor,darktext,lightTeal,pink} = strings
const ios = Platform.OS === 'ios' ? true : false
let RoomJson = require('./Rooms');

export default class RoomList extends Component {
    constructor(props){
        super(props)
        this.state = {loading:true}
    }
    componentDidMount() {
        if(RoomJson.Status){
            let RoomData = RoomJson.RoomList.GetHotelRoomResult
            let {HotelRoomsDetails,RoomCombinations} = RoomData
            

            let group = HotelRoomsDetails.reduce((r, a) => {
               
                r[a.RoomTypeName] = [...r[a.RoomTypeName] || [], a];
                return r;
               }, {});
               this.setState({loading:false,group,RoomCombinations,HotelRoomsDetails})
            //    console.warn("group", group);
           
        }
        // console.warn(RoomJson.RoomList)
    }
    
    render() {
        let {HotelRoomsDetails,RoomCombinations,loading,group,} = this.state
        return (
            <View style={{flex:1}}>
                 <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                 <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8} ]}>Select Room </Text>
                 {loading ? <Loader/> : null}

                 {HotelRoomsDetails ?
                  Object.keys(group).map((key,id)=>
                  <View key={id} style={{margin:8,borderBottomWidth:0.6,borderColor:'#ddd'}}>
                        <Text style={[{fontSize:22,fontWeight:'500',color:dColor,fontFamily:ios?'Optima':'sans-serif-medium',margin:8} ]}>{key.toUpperCase()} </Text>
                        {group[key].map((hotel,index)=>{
                            let {Price,CancellationPolicy} = hotel
                            let {OfferedPriceRoundedOff,PublishedPriceRoundedOff} = Price
                            return(
                                <TouchableOpacity activeOpacity={0.8}
                                 key={index} style={{margin:5,borderTopWidth:0.4,borderColor:'#ddd'}}>
                                     <Text style={{fontSize:22,fontWeight:'500',color:darktext,letterSpacing:1}}> ₹ {OfferedPriceRoundedOff} </Text>
                                     {PublishedPriceRoundedOff && PublishedPriceRoundedOff > OfferedPriceRoundedOff
                                         ? <Text style={{fontSize:14,color:'#95a5a6',textDecorationLine:'line-through'}}> ₹ {PublishedPriceRoundedOff} </Text>:null}

                                         <View style={{margin:8,}}>
                                             <Text style={{fontSize:16,color:pink,fontWeight:'500',letterSpacing:1}}>Cancellation Policy</Text>
                                             <Text style={{color:darktext,fontWeight:'500',letterSpacing:1}}>{CancellationPolicy.slice(0,100)}</Text>
                                             
                                         </View>
                 
                                </TouchableOpacity>
                            )
                        })}
                  </View>
                  )
                 :
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:22,fontWeight:'500',color:pink,textAlign:'center'}}>No Rooms Found.</Text>
                 </View>
                }

            </View>
        )
    }
}
