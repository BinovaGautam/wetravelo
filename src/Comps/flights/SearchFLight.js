import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import { Header, Icon } from 'native-base';
import SelectDate from './SelectDate';
import axios from 'axios'
import Snackbar from 'react-native-snackbar'
import {strings,Loader} from '../assets'
import OffersSlide from './Offers/OffersSlide';
import {connect} from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import MultiCitySearch from './MultiCitySearch';

let {darktext,dColor,lightTeal} = strings

 class SearchFlight extends Component {
    static navigationOptions = ({navigation})=> ({
        header: null,
        title:'Search Flight',
        headerLeft: <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} onPress={()=>navigation.navigate('Home')} />
                    </TouchableOpacity>
    })
    constructor(props){
        super(props)
        this.state= props.initialState
    }

    componentDidMount() {
        this.props.navigation.setParams({from : this.from , to : this.to , travelClass : this.travelClass,getDay : this.getDay})
        
    }

    getDay = (date,string,dayType) =>{
        let {back,departure} = this.state
        
        if(dayType === 'departure'){
            // alert(Date.parse(date) > 3 ? 'yes' : 'no')
            back ? Date.parse(back.date)  > Date.parse(date) ? 
             this.setState({departure : {date,DepartureDate:string}}) : 
              this.setState({departure:{date: back.date, DepartureDate : back.ReturnDate}, back : {date,ReturnDate:string}})
              : this.setState({departure : {date,DepartureDate:string}})
           
        }else{
            Date.parse(departure.date)  < Date.parse(date) ? 
             this.setState({back : {date,ReturnDate:string},type:'Return'}) : 
              this.setState({back:{date: departure.date, ReturnDate : departure.DepartureDate}, departure : {date,DepartureDate:string},type:'Return'})
              
        }
    }

    selectType = type =>{ //select flight type like oneway/return/multicity
        let {recent,uid,flight} = this.props
        let {back} = this.state
        
        this.setState({type,back :type != 'Return' ? null : back })

        flight.type = type
        recent.flight = flight
        firestore().collection('users').doc(uid).update({recent})
    }

    from  = data =>{
        let {recent,selectPort,uid,flight} = this.props
        console.warn(data)
        this.setState({from :data})
        flight.from = data       //changing the flight object from redux store
        recent.flight = flight   // updating flight object inside parent recent object

        firestore().collection('users').doc(uid).update({recent})
        selectPort('from',data)
    }

    to = data =>{
        let {recent,selectPort,uid,flight} = this.props
        this.setState({to :data})
        flight.to = data       //changing the flight object from redux store
        recent.flight = flight   // updating flight object inside parent recent object

        firestore().collection('users').doc(uid).update({recent})
        this.props.selectPort('to',data)
    }

    travelClass = ({CabinClass,AdultCount,ChildCount,InfantCount}) => {
        let {recent,selectPort,uid,flight} = this.props

        Object.assign(flight,{CabinClass,AdultCount,ChildCount,InfantCount,travellers:AdultCount+ChildCount+InfantCount,cabin:true})

        recent.flight = flight
        firestore().collection('users').doc(uid).update({recent})
        
        this.setState({CabinClass,AdultCount,ChildCount,InfantCount,travellers:AdultCount+ChildCount+InfantCount,cabin:true})
        this.props.setTravellers({CabinClass,AdultCount,ChildCount,InfantCount,travellers:AdultCount+ChildCount+InfantCount,cabin:true})
    }

    search = () =>{
        // alert(JSON.stringify(this.state))
        // if type multicity do it differently
        const {type} = this.state
         
            if(type === 'Multicity'){
                const {type,travellers,CabinClass,AdultCount,ChildCount,InfantCount,cabin,Segments} = this.state

                if(Segments && cabin){
                    let data =  { AdultCount,ChildCount,InfantCount,JourneyType: type,CabinClass, Segments}
                    this.props.navigation.navigate('FlightList',{data,type})
                }else{
                    let msg = cabin ? Segments ? null :'Please Fill Travel Details' : 'Please Select Class and Cabin'
                    Snackbar.show({
                        title:`${msg}`,
                        duration: Snackbar.LENGTH_SHORT
                    })
                }
            }else{
                    
                const {type,from,to,departure,back,travellers,CabinClass,AdultCount,ChildCount,InfantCount,cabin} = this.state
                if(to && from && departure && cabin ){
                    if(type === 'Return' && !back){
                        Snackbar.show({
                            title: `Select Return Date`,
                            duration: Snackbar.LENGTH_SHORT
                        });
                    }else{
                        let data =  { AdultCount,ChildCount,InfantCount,JourneyType: type,CabinClass,
                                        Segments: 
                                        [ { Origin: from.IATA,
                                            Destination: to.IATA,
                                            DepartureDate: departure.DepartureDate,
                                            ReturnDate: back ? back.ReturnDate : '' } ] }

                            this.props.navigation.navigate('FlightList',{data,type})
                    
                    }
                    

                }else{
                    let msg  =  from  ? to ? departure ? 'Select Class And Cabin' : 'Select Departure Date' : 'Select A Destination' : 'Select An Origin' 
                    Snackbar.show({
                        title: `${msg}`,
                        duration: Snackbar.LENGTH_SHORT
                    });
                }
                    
                }

    }

    getSegment = (Segments) => {
        this.setState({Segments})
    }
    
    render() {
        const {type,from,to,departure,back,travellers,CabinClass,maxDate,count} = this.state
        const {navigation} = this.props
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
        return (
            <View style={{marginTop:24,flex:1,backgroundColor: '#fff',}}>
                <StatusBar backgroundColor="#fff" translucent={true} barStyle="dark-content"/>
                 <View style={{flexDirection:'row'}}>
                     <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Home')}  style={{height:50,width:50,justifyContent:'center',}}>
                         <Icon name="keyboard-backspace" type="MaterialCommunityIcons" style={{textAlign:'center',marginTop:15,color:darktext,fontSize:30}}/>
                     </TouchableOpacity>
                     <Options type={type} selectType={this.selectType} />
                 </View>
                 <ScrollView style={{backgroundColor: '#f5f5f5',}}>
                        <View style={{padding:10,marginTop:20,backgroundColor: "#fff",}}>
                        { type == 'Multicity' ?
                        <MultiCitySearch weekdays={weekdays} months={months} getSegment={this.getSegment} from={this.from} to={this.to} getDay={this.getDay} navigation={navigation} />
                        :
                        <View style={{flex:1}}>
                        
                            <TouchableOpacity activeOpacity={0.8}  onPress = {() => navigation.navigate('SelectPort',{type:this.from})}
                            style={[styles.box,{marginTop:0}]}>
                                <Text style={{fontWeight:'400', marginHorizontal:8}}>FROM</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}>{from ? from.IATA :'SELECT SOURCE'}</Text>
                                    <Text style={{fontWeight:'700',color:darktext,marginHorizontal:8, fontSize:18,letterSpacing:1}}>{from ? from.City :null}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8}   onPress = {() => navigation.navigate('SelectPort',{type:this.to})}
                            style={styles.box}>
                                <Text style={{fontWeight:'400',marginHorizontal:8}}>TO</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}>{to ? to.IATA :'SELECT DESTINATION'}</Text>
                                    <Text style={{fontWeight:'700',color:darktext,marginHorizontal:8, fontSize:18,letterSpacing:1}}>{to ? to.City : null}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8}  onPress={()=>this.setState({to:from,from:to})}
                            style={{position:'absolute',backgroundColor: '#fff',borderWidth:1,borderColor:"#c0c4cc", height:70,width:70,borderRadius:35,right:50,top:40,justifyContent:'center'}}>
                                <View style={{height:10,position:'absolute',backgroundColor: '#fff',top:29,left:-1,width:400}}/>
                                <Icon name="swap-vertical" type="MaterialCommunityIcons" style={{color:dColor,textAlign:'center',fontSize:40,}}/>
                                
                            </TouchableOpacity>

                            <View style={[styles.box,{flexDirection:'row'}]}>

                                <TouchableOpacity activeOpacity={0.8} style={[{flex:1}]} onPress={()=>navigation.navigate('SelectDate',{getDay:this.getDay,dayType:'departure',maxDate})}>
                                    <Text style={{fontWeight:'400',marginHorizontal:8}}>DEPARTURE</Text>
                                    {departure ? 
                                    <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                        <Text style={{fontWeight:'700',fontSize:28,color:dColor,textAlign:'left'}}> {departure.date.getDate()} </Text>
                                        <View style={{justifyContent:'center',flex:1,}}>
                                                <Text style={{color:'#000',}}>{months[departure.date.getMonth()]} {departure.date.getFullYear()}</Text>
                                                <Text style={{color:darktext,}}>{weekdays[departure.date.getDay()]}</Text>
                                        </View>
                                    </View>
                                    :
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}> SELECT </Text>} 
                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.8} style={[{flex:1,opacity:departure ? 1 : 0.3}]} disabled={!departure}
                                onPress={()=>navigation.navigate('SelectDate',{getDay:this.getDay,dayType:'return'})}>
                                    <Text style={{fontWeight:'400',marginHorizontal:8}}>RETURN</Text>
                                    {back ? 
                                    <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                        <Text style={{fontWeight:'700',fontSize:28,color:dColor,textAlign:'left'}}> {back.date.getDate()} </Text>
                                        <View style={{justifyContent:'center',flex:1,}}>
                                                <Text style={{color:'#000',}}>{months[back.date.getMonth()]} {back.date.getFullYear()}</Text>
                                                <Text style={{color:darktext,}}>{weekdays[back.date.getDay()]}</Text>
                                        </View>
                                    </View>
                                    :
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:20,letterSpacing:1}}> SELECT </Text>} 
                            </TouchableOpacity>

                            </View>
                        </View>
                            
                        }
                            <TouchableOpacity  onPress={() => navigation.navigate('TravellerClass',{travelClass: this.travelClass})} style={[styles.box,{flexDirection:'row'}]}>

                                <View activeOpacity={0.8} style={[{flex:1}]}>
                                    <Text style={{fontWeight:'400',marginHorizontal:8}}>CLASS</Text>
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:18}}>{CabinClass.toUpperCase()}</Text>
                                </View>


                                <View activeOpacity={0.8} style={[{flex:1}]}>
                                    <Text style={{fontWeight:'400',marginHorizontal:8}}>PASSENGERS</Text>
                                    <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:28}}> 0{travellers} </Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                    
                    <TouchableOpacity activeOpacity={0.8} onPress={this.search} style={{height:50,borderRadius:4,justifyContent:'center',backgroundColor: dColor,margin:10}}>
                           <Text style={{fontWeight:'700',color:'#fff',textAlign:'center',fontSize:18,letterSpacing:1}}>SEARCH</Text>
                    </TouchableOpacity>
                   
                        <OffersSlide />
                    </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    box : {height:70,borderWidth:1,borderColor:'#c0c4cc',borderRadius:4,justifyContent:'center',marginTop:10,padding:5}
})

const Options = (props) =>{
    return(
        <View style={{marginTop:15,height:40,borderRadius:20,borderWidth:0,borderColor:dColor,flexDirection:'row',elevation:3,flex:1,justifyContent:'center',marginRight:20}}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('OneWay')}
           style={{flex:1,justifyContent:'center',borderBottomLeftRadius:20,borderTopLeftRadius:20,borderRightWidth:0.5,borderColor:'#f5f5f5',backgroundColor:props.type == "OneWay" ?lightTeal : '#fff'}}>
               <Text style={{color:props.type == 'OneWay'? '#fff' :lightTeal,textAlign:'center'}}>ONEWAY</Text>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('Return')}
           style={{flex:1,justifyContent:'center',borderRightWidth:0.5,borderColor:'#f5f5f5',backgroundColor:props.type == "Return" ?lightTeal : '#fff'}}>
               <Text style={{color:props.type == 'Return'? '#fff' :lightTeal,textAlign:'center'}}>ROUND TRIP</Text>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('Multicity')}
           style={{flex:1,justifyContent:'center',borderBottomRightRadius:20,borderTopRightRadius:20,backgroundColor:props.type == "Multicity" ?lightTeal : '#fff'}}>
               <Text style={{color:props.type == 'Multicity'? '#fff' :lightTeal,textAlign:'center'}}>MULTI CITY</Text>
           </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        initialState : state.flight,
        uid : state.auth.user.uid,
        recent : state.auth.userDetail.recent || {} ,  //recent searches
        flight : state.flight.recent || {}    //recent flight search from firestore
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        selectPort : (title,data) => dispatch({type:'SELECT_PORT',payload : {title ,data }}),
        setTravellers : (data) => dispatch({type:'TRAVELLERS',payload:data})
        // setRecent : (data => dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchFlight)