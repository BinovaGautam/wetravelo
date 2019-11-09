import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import { classes } from 'istanbul-lib-coverage'
import {strings} from  '../assets'

let {dColor,darktext} = strings
export default class SelectGuests extends Component {
    static navigationOptions = {
        title:'',
        headerStyle:{
            marginTop:40
        }
    }

    constructor(props){
        super(props)
        this.state ={childAge : [],
            travellers : [
                {title:'Adults',name:'AdultCount',value : 1,description:'Ages Above 12 Years'},
                {title:'Children',name:'ChildCount',value : 0,description:'Below 12 Years'},
            ]
        }
    }

    
    

    alterValue = (change,id) =>{
        let {travellers,childAge} = this.state
        if(!id && change < 0 && travellers[id].value < 2){
            //nothing to do in this case
        }else{
            travellers[id].value += change
            if(id){
              change > 0 ?  childAge.push(5) : childAge.pop()
            }
            this.setState({travellers,childAge})
        }
         
         
    }
    
    submit = () =>{
        let {travellers,childAge} = this.state
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        let {citydetails,address,CheckInDate,NoOfNights} = navparams
        let RoomGuests = {NoOfAdults : travellers[0].value, NoOfChild : travellers[1].value ,childAge }
        navigation.navigate('HotelsList',{citydetails,address,CheckInDate,NoOfNights,RoomGuests})
        
    }

    selectChildage = (age,id) =>{
        let {childAge} = this.state
        childAge[id] = age
        this.setState({childAge})
    }
   
    render() {
        let {travellers,childAge} = this.state
        return (
            <View style={{flex:1}}>
                 <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
      
                 <View style={{flex:1}}>
                     
                <Text style={{margin:10,color:dColor,fontWeight:'500',fontSize:20}}> GUESTS </Text>

                {travellers.map((traveller,id)=>
                     <View key={id} style={{margin:12,flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                         <View style={{justifyContent:'center',flex:3}}>
                             <Text style={{color:'#000',fontSize:20}}> {traveller.title} </Text>
                             <Text style={{color:dColor,}}> {traveller.description} </Text>
                         </View>

                         <View style={{flex:2,flexDirection:'row',justifyContent:'center',height:40,borderWidth:2,borderRadius:6,borderColor:dColor}}>
                             <TouchableOpacity activeOpacity={0.7} style={{flex:1,justifyContent:'center',opacity:traveller.value ? 1 : 0.2}}  
                             disabled={!traveller.value} onPress={() =>this.alterValue(-1,id)}>
                                 <Text style={{fontSize:24,color:dColor,fontWeight:'600',textAlign:'center'}}> - </Text>
                             </TouchableOpacity>

                             <View style={{flex:1,justifyContent:'center'}}>
                                 <Text style={{fontSize:20,color:'#000',textAlign:'center'}}> {traveller.value} </Text>
                             </View>


                             <TouchableOpacity onPress={() =>this.alterValue(1,id)}  activeOpacity={0.7} style={{flex:1,justifyContent:'center'}}>
                                 <Text style={{fontSize:24,color:dColor,fontWeight:'600',textAlign:'center'}}> + </Text>
                             </TouchableOpacity>
                         </View>
                     </View>
                    )}
                    <ScrollView style={{flex:1}}>
                            {
                                childAge.length ? 
                                childAge.map((childage,id)=>
                                <View key={id}>
                                    <Text style={{color:darktext,margin:10,fontWeight:'500',fontSize:16,letterSpacing:1}}>Age of the child {id+1} </Text>
                                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(age =>
                                            <TouchableOpacity key={age} activeOpacity={0.8} onPress={() => this.selectChildage(age,id)}
                                            style={{justifyContent:'center',margin:10,height:40,width:40,borderRadius:20,backgroundColor:childage == age ? dColor : 'transparent',borderWidth:1,borderColor:dColor  }}>
                                            <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:childage == age ? '#fff' : dColor}}> {age} </Text>
                                        </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                </View>
                                )
                                :null
                            }
                    </ScrollView>
                 

                    

            </View>

            <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',}}>
                <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                 style={{borderRadius:5,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:20,letterSpacing:1}}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
       
            </View>
            )
    }
}
