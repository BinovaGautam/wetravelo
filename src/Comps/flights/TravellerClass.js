import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity, } from 'react-native'
import {strings} from '../assets'

let {dColor} =strings
export default class TravellerClass extends Component {
    static navigationOptions = {
        title:'Select Travellers & Class'
    }

    constructor(props){
        super(props)
        this.state ={selected:'Economy',
            travellers : [
                {title:'Adults',name:'AdultCount',value : 1,description:'Ages Above 12 Years'},
                {title:'Children',name:'ChildCount',value : 0,description:'Ages 2 - 12 Years'},
                {title:'Infants',name:'InfantCount',value : 0,description:'Under 2 Years'},
            ]
        }
    }

    alterValue = (change,id) =>{
        let {travellers} = this.state
        if(!id && change < 0 && travellers[id].value < 2){
            //nothing to do in this case
        }else{
            travellers[id].value += change
            this.setState({travellers})
        }
         
         
    }
    
    submit = () =>{
        let {travellers,selected} = this.state
        let {navigation} = this.props
        let travelClass = navigation.getParam('travelClass',null)
        let data = {AdultCount : travellers[0].value, ChildCount : travellers[1].value , InfantCount: travellers[2].value , CabinClass: selected}
        // alert(JSON.stringify(data))
        if(travelClass) travelClass(data)
        navigation.goBack()
    }
   
    render() {
        let {travellers,selected} = this.state
        let classes = ['Economy','Premium Economy','Business']
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#fff" translucent={true} barStyle="dark-content" />
                 <View style={{flex:1}}>
                <Text style={{margin:10,color:dColor,fontWeight:'500',fontSize:20}}> TRAVELLERS </Text>

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

                    <Text style={{margin:10,color:dColor,fontWeight:'500',fontSize:20,marginTop:30}}> CABIN CLASS </Text>

                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {classes.map((cabin,id)=>
                            <TouchableOpacity key={id} activeOpacity={0.8} onPress={()=>this.setState({selected:cabin})}
                            style={{height:40,padding:8,backgroundColor:selected === cabin ? "#000" : '#fff',justifyContent:'center',margin:10,borderWidth:2,borderColor:"#000"}}>
                                <Text style={{color:selected === cabin ? '#fff' : "#000",textAlign:'center',fontWeight:'500',fontSize:16}}> {cabin} </Text>
                            </TouchableOpacity>
                            )}

                    </View>

            </View>

            <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',}}>
                <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                 style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:16}}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
       
            </View>
            )
    }
}
