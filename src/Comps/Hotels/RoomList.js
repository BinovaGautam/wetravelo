import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity,ScrollView} from 'react-native'
import {strings, Loader} from '../assets'
import Axios from 'axios'
import { Icon } from 'native-base'

let {dColor,darktext,lightTeal,pink} = strings
const ios = Platform.OS === 'ios' ? true : false
// let RoomJson = require('./Rooms');

export default class RoomList extends Component {
    constructor(props){
        super(props)
        this.state = {loading:true}
    }
    componentDidMount() {
        // if(RoomJson.Status){
        //     let RoomData = RoomJson.RoomList.GetHotelRoomResult
        //     let {HotelRoomsDetails,RoomCombinations} = RoomData
            

        //     let group = HotelRoomsDetails.reduce((r, a) => {
               
        //         r[a.RoomTypeName] = [...r[a.RoomTypeName] || [], a];
        //         return r;
        //        }, {});
        //        this.setState({loading:false,group,RoomCombinations,HotelRoomsDetails})
        //     //    console.warn("group", group);
           
        // }
        // console.warn(RoomJson.RoomList)

        this.getRoomList()
    }
    
    getRoomList = () =>{
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        
        let {ResultToken} = navparams
        this.setState({ResultToken})
        Axios({
            url: 'http://test.services.travelomatix.com/webservices/index.php/hotel_v3/service/RoomList',
            method: 'POST',
            headers: 
            { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'x-Password': 'test@229',
                'x-system': 'test',
                'x-DomainKey': 'TMX1512291534825461',
                'x-Username': 'test229267' },
            data:{ResultToken},
            json: true })
            .then(response =>{
            console.log('waiting.....')
             let RoomJson = response.data
             console.log(RoomJson.Status,'status')
            //  alert(JSON.stringify(RoomJson))
             if(RoomJson.Status){
                let RoomData = RoomJson.RoomList.GetHotelRoomResult
                let {HotelRoomsDetails,RoomCombinations} = RoomData
            

                let group = HotelRoomsDetails.reduce((r, a) => {
                   
                    r[a.RoomTypeName] = [...r[a.RoomTypeName] || [], a];
                    return r;
                   }, {});
                   this.setState({loading:false,group,RoomCombinations,HotelRoomsDetails})
            }else{
                alert(RoomJson.Message || 'Internal Server Error.')
                this.setState({loading:false})
            }
            }).catch(err =>{
                  alert(JSON.stringify(err))
            })
    }

    render() {
        let {HotelRoomsDetails,RoomCombinations,loading,group,selected,roomId,groupId,ResultToken} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor: '#fff',}}>
                 <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
               
                 {loading ? <Loader/> : null}

                 {HotelRoomsDetails ?
                  <View style={{flex:1}}>
                        <Text style={[{fontSize:32,fontWeight:'600',letterSpacing:1,color:'#000',fontFamily:ios?'Optima':'sans-serif-medium',margin:8} ]}>Select Room </Text>
                      <ScrollView style={{flex:1}}>
                           { Object.keys(group).map((key,id)=>
                            <View key={id} style={{margin:8,}}>
                                    <Text style={[{fontSize:18,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:8,letterSpacing:1} ]}>{key.toUpperCase()} </Text>
                                    {group[key].map((hotel,index)=>{
                                        let {Price,CancellationPolicy} = hotel
                                        let {OfferedPriceRoundedOff,PublishedPriceRoundedOff} = Price
                                        let isSelected = roomId == index && groupId == id 
                                        return(
                                            <TouchableOpacity activeOpacity={0.8} onPress={()=> this.setState({selected:hotel,roomId:index,groupId:id})}
                                            key={index} style={{margin:5,backgroundColor:"#ecf0f1" , borderRadius:5,padding:10}}>
                                                <View style={{flexDirection:'row',margin:8}}>
                                                    <Text style={{fontSize:22,fontWeight:'500',color:isSelected ? dColor : darktext,letterSpacing:1,flex:1}}> ₹ {OfferedPriceRoundedOff} </Text>
                                                    <Icon name={isSelected?"ios-checkmark-circle":"circle"} type={isSelected?'Ionicons':'Feather'} 
                                                    style={{margin:8,color:selected?lightTeal:darktext,alignSelf: 'center',textAlign:'center'}}/>
                                                </View>
                                               
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
                            )}
                      </ScrollView>
                      {selected ? 
                        <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                            <View style={{flex:1,justifyContent:'center',marginLeft:5}}>
                                <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {selected.Price.OfferedPriceRoundedOff} </Text>
                                {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellerCount}  {travellerCount >1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
                            </View>
                            <TouchableOpacity  activeOpacity={0.8} onPress={()=>navigation.navigate('GuestDetails',{ResultToken,RoomUniqueId:[selected.RoomUniqueId]})}
                            style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                                <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:15,letterSpacing:1}}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View>
                        :null}
                  </View>
                 :
                 loading ? null :
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:22,fontWeight:'500',color:pink,textAlign:'center'}}>No Rooms Found.</Text>
                 </View>
                }

            </View>
        )
    }
}
