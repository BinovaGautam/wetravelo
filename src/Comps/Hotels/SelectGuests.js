import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import { classes } from 'istanbul-lib-coverage'
import {strings} from  '../assets'
import {connect} from 'react-redux'

let {dColor,darktext,silver,pink} = strings
class SelectGuests extends Component {
    static navigationOptions = {
        title:'Rooms & Guests',
      
    }

    constructor(props){
        super(props)
        this.state ={childAge : [],NoOfRooms:1,...this.props.hotel,
            travellers : [
                {title:'Adults',name:'AdultCount',value : 1,description:'Ages Above 12 Years'},
                {title:'Children',name:'ChildCount',value : 0,description:'Below 12 Years'},
            ]
        }
    }

    
    

    alterValue = (change,id0,id1) =>{
        let {RoomGuests,NoOfGuests} = this.props.hotel
        let travellers = RoomGuests[id0]
        if(!id1 && change < 0 && travellers[id1 ? 'NoOfChild' : 'NoOfAdults'] < 2){
            //nothing to do in this case
        }else{
            travellers[id1 ? 'NoOfChild' : 'NoOfAdults'] += change
            if(id1){
              change > 0 ?  travellers.ChildAge.push(5) : travellers.ChildAge.pop()
            }
             NoOfGuests += change
            RoomGuests[id0] = travellers
            this.props.selectGuests({RoomGuests,NoOfGuests})
            
            // this.setState({RoomGuests})
        }
         
         
    }
    
    submit = () =>{
        // let {travellers,childAge,NoOfRooms} = this.state
        // let {navigation} = this.props
        // let navparams =  navigation.state.params || {}
        // let {getGuests} = navparams
        // let RoomGuests = {NoOfAdults : travellers[0].value, NoOfChild : travellers[1].value ,childAge }
        // let NoOfGuests =  travellers.reduce((a,b) => a + b.value,0)
        // if(getGuests) getGuests(NoOfRooms,RoomGuests,NoOfGuests )
        this.props.navigation.goBack()
        
    }

    selectChildage = (age,id0,id2) =>{
        let {RoomGuests} = this.props.hotel
        let travellers = RoomGuests[id0]
        travellers.ChildAge[id2] = age

        RoomGuests[id0] = travellers
        this.props.selectGuests({RoomGuests})
    }


    add = () => {
        let {RoomGuests,NoOfGuests} = this.props.hotel
        RoomGuests.push({NoOfAdults:1,NoOfChild:0,ChildAge:[]})
        // console.warn(RoomGuests)
        NoOfGuests ++
        this.props.selectGuests({RoomGuests,NoOfRooms:RoomGuests.length,NoOfGuests})
    }

    remove = (id) => {
        let {RoomGuests,NoOfGuests} = this.props.hotel
        let travellers = RoomGuests[id]
        let RoomGuest = travellers.NoOfAdults + travellers.NoOfChild
        RoomGuests.splice(id,1)
        NoOfGuests -= RoomGuest
        this.props.selectGuests({RoomGuests,NoOfRooms:RoomGuests.length,NoOfGuests})
    }
   
    render() {
        let {travellers,} = this.state
        let {NoOfRooms,RoomGuests} = this.props.hotel
        return (
            <View style={{flex:1}}>
                 <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                 <ScrollView style={{flex:1,backgroundColor: silver,}}>
                 {/* <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5} ]}>Guests & Rooms</Text> */}
                     {RoomGuests.map((room,id0)=>{
                            let {NoOfAdults,NoOfChild,ChildAge} = room
                            let guestLoop = [{value: NoOfAdults,title:'Adults',description:'Above 12 Years Of Age'},
                                            {value: NoOfChild,title:'Children',description:'Below 12 Years Of Age'}]
                         return(
                                <View key={id0} style={{margin:8,padding:8,backgroundColor:'#fff',borderRadius:5,marginBottom:10,}}>
                                   <View style={{flexDirection:'row',margin:5}}>
                                       <Text style={{flex:1,color:pink,fontWeight:'700',letterSpacing:1,margin:5}}>ROOM {id0+1} </Text>
                                       {id0 ?
                                       <TouchableOpacity activeOpacity={0.5} onPress={()=> this.remove(id0)} style={{ padding:5,justifyContent:'center',margin:8}}>
                                            <Text style={{color:darktext,fontSize:11,letterSpacing:1,fontWeight:'500',textAlign:'center'}}>REMOVE</Text>
                                        </TouchableOpacity>:null}
                                   </View>

                             
                
                                    {guestLoop.map((traveller,id1)=>
                                        <View key={id1} style={{margin:12,flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                                            <View style={{justifyContent:'center',flex:3}}>
                                                <Text style={{color:'#000',fontSize:20}}> {traveller.title} </Text>
                                                <Text style={{color:dColor,}}> {traveller.description} </Text>
                                            </View>
                    
                                            <View style={{flex:2,flexDirection:'row',justifyContent:'center',height:40,borderWidth:2,borderRadius:6,borderColor:dColor}}>
                                                <TouchableOpacity activeOpacity={0.7} style={{flex:1,justifyContent:'center',opacity:traveller.value ? 1 : 0.2}}  
                                                disabled={!traveller.value} onPress={() =>this.alterValue(-1,id0,id1)}>
                                                    <Text style={{fontSize:24,color:dColor,fontWeight:'600',textAlign:'center'}}> - </Text>
                                                </TouchableOpacity>
                    
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <Text style={{fontSize:20,color:'#000',textAlign:'center'}}> {traveller.value} </Text>
                                                </View>
                    
                    
                                                <TouchableOpacity onPress={() =>this.alterValue(1,id0,id1)}  activeOpacity={0.7} style={{flex:1,justifyContent:'center'}}>
                                                    <Text style={{fontSize:24,color:dColor,fontWeight:'600',textAlign:'center'}}> + </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}
                                            {
                                                ChildAge.length ? 
                                                ChildAge.map((childage,id)=>
                                                <View key={id}>
                                                    <Text style={{color:darktext,margin:10,fontWeight:'500',fontSize:16,letterSpacing:1}}>Age of the child {id+1} </Text>
                                                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(age =>
                                                            <TouchableOpacity key={age} activeOpacity={0.8} onPress={() => this.selectChildage(age,id0,id)}
                                                            style={{justifyContent:'center',margin:10,height:40,width:40,borderRadius:20,backgroundColor:childage == age ? dColor : 'transparent',borderWidth:1,borderColor:dColor  }}>
                                                            <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:childage == age ? '#fff' : dColor}}> {age} </Text>
                                                        </TouchableOpacity>
                                                        )}
                                                    </ScrollView>
                                                </View>
                                                )
                                                :null
                                            }
                
                            </View>
            
                         )
                     })}


                       
                
             

            </ScrollView>
                 

            <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                <TouchableOpacity  activeOpacity={0.8} onPress={this.add}
                       style={{borderRadius:5,flex:1, justifyContent:'center',backgroundColor:pink,marginHorizontal:10,marginBottom:10}}>
                            <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:20,letterSpacing:1}}>ADD ROOM</Text>
                </TouchableOpacity>


                <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                 style={{borderRadius:5,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:20,letterSpacing:1}}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
       
            </View>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotel
    }
}

const  mapDispatchToProps = (dispatch, ownProps) => {
    return {
       selectGuests : (data) => dispatch({type:'SELECT_ROOMS',payload : {...data}}),
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(SelectGuests)