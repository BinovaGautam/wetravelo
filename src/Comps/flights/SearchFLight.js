import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import { Header, Icon } from 'native-base';
import SelectDate from './SelectDate';
import axios from 'axios'
import Snackbar from 'react-native-snackbar'

const darktext = "#303133"
// const blue = "#0078ff"
const dColor = "#026C70"

export default class SearchFlight extends Component {
    static navigationOptions = {
        title:'Search Flight'
    }
    constructor(props){
        super(props)
        this.state={type:'OneWay',CabinClass:'Economy',travellers:1,cabin:false}
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

    from  = data =>this.setState({from : data})

    to = data => this.setState({to : data})

    travelClass = ({CabinClass,AdultCount,ChildCount,InfantCount}) => this.setState({CabinClass,AdultCount,ChildCount,InfantCount,travellers:AdultCount+ChildCount+InfantCount,cabin:true})

    search = () =>{
        // alert(JSON.stringify(this.state))
        // alert('started')
       

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
    
    render() {
        const {type,from,to,departure,back,travellers,CabinClass,maxDate} = this.state
        const {navigation} = this.props
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
        return (
            <View style={{marginTop:24,flex:1,backgroundColor: '#fff',}}>
                <StatusBar backgroundColor="#fff" translucent={true} barStyle="dark-content"/>
                <Options type={type} selectType={type => this.setState({type,back :type != 'Return' ? null : back })} />
                <ScrollView style={{flex:1}}>
                    <View style={{padding:10,marginTop:20,backgroundColor: "#fff",}}>
                        
                        <TouchableOpacity activeOpacity={0.8}  onPress = {() => navigation.navigate('SelectPort',{type:this.from})}
                        style={[styles.box,{marginTop:0}]}>
                            <Text style={{fontWeight:'400', marginHorizontal:8}}>FROM</Text>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:20}}>{from ? from.IATA :'SELECT SOURCE'}</Text>
                                <Text style={{fontWeight:'500',color:darktext,marginHorizontal:8, fontSize:20}}>{from ? from.City :null}</Text>
                               </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8}   onPress = {() => navigation.navigate('SelectPort',{type:this.to})}
                        style={styles.box}>
                            <Text style={{fontWeight:'400',marginHorizontal:8}}>TO</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:20}}>{to ? to.IATA :'SELECT DESTINATION'}</Text>
                                <Text style={{fontWeight:'500',color:darktext,marginHorizontal:8, fontSize:20}}>{to ? to.City : null}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8}  onPress={()=>this.setState({to:from,from:to})}
                        style={{position:'absolute',backgroundColor: '#fff',borderWidth:1,borderColor:"#c0c4cc", height:70,width:70,borderRadius:35,right:70,top:50,justifyContent:'center'}}>
                            <View style={{height:10,position:'absolute',backgroundColor: '#fff',top:29,left:-1,width:400}}/>
                            <Icon name="swap-vertical" type="MaterialCommunityIcons" style={{color:dColor,textAlign:'center',fontSize:40,}}/>
                            
                        </TouchableOpacity>

                        <View style={[styles.box,{flexDirection:'row'}]}>

                            <TouchableOpacity activeOpacity={0.8} style={[{flex:1}]} onPress={()=>navigation.navigate('SelectDate',{getDay:this.getDay,dayType:'departure',maxDate})}>
                                <Text style={{fontWeight:'400',marginHorizontal:8}}>DEPARTURE</Text>
                                 {departure ? 
                                  <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                      <Text style={{fontWeight:'500',fontSize:28,color:dColor,textAlign:'left'}}> {departure.date.getDate()} </Text>
                                      <View style={{justifyContent:'center',flex:1,}}>
                                            <Text style={{color:'#000',}}>{months[departure.date.getMonth()]} {departure.date.getFullYear()}</Text>
                                            <Text style={{color:darktext,}}>{weekdays[departure.date.getDay()]}</Text>
                                      </View>
                                  </View>
                                 :
                                  <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:20}}> SELECT </Text>} 
                            </TouchableOpacity>


                            <TouchableOpacity activeOpacity={0.8} style={[{flex:1,opacity:departure ? 1 : 0.3}]} disabled={!departure}
                             onPress={()=>navigation.navigate('SelectDate',{getDay:this.getDay,dayType:'return'})}>
                                <Text style={{fontWeight:'400',marginHorizontal:8}}>RETURN</Text>
                                {back ? 
                                  <View style={{flexDirection:'row',justifyContent:'center',margin:3}}>
                                      <Text style={{fontWeight:'500',fontSize:28,color:dColor,textAlign:'left'}}> {back.date.getDate()} </Text>
                                      <View style={{justifyContent:'center',flex:1,}}>
                                            <Text style={{color:'#000',}}>{months[back.date.getMonth()]} {back.date.getFullYear()}</Text>
                                            <Text style={{color:darktext,}}>{weekdays[back.date.getDay()]}</Text>
                                      </View>
                                  </View>
                                 :
                                  <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:20}}> SELECT </Text>} 
                           </TouchableOpacity>

                        </View>

                        <TouchableOpacity  onPress={() => navigation.navigate('TravellerClass',{travelClass: this.travelClass})} style={[styles.box,{flexDirection:'row'}]}>

                            <View activeOpacity={0.8} style={[{flex:1}]}>
                                <Text style={{fontWeight:'400',marginHorizontal:8}}>CLASS</Text>
                                <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:18}}>{CabinClass.toUpperCase()}</Text>
                            </View>


                            <View activeOpacity={0.8} style={[{flex:1}]}>
                                <Text style={{fontWeight:'400',marginHorizontal:8}}>PASSENGERS</Text>
                                <Text style={{fontWeight:'500',color:dColor,marginHorizontal:8, fontSize:28}}> 0{travellers} </Text>
                            </View>

                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity activeOpacity={0.8} onPress={this.search} style={{height:50,borderRadius:4,justifyContent:'center',backgroundColor: dColor,margin:10}}>
                           <Text style={{fontWeight:'500',color:'#fff',textAlign:'center'}}>SEARCH</Text>
                    </TouchableOpacity>
                    
                   
                   
                    
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
        <View style={{marginTop:20,marginHorizontal:20,height:30,borderRadius:15,borderWidth:1,borderColor:dColor,flexDirection:'row',elevation:3}}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('OneWay')}
           style={{flex:1,justifyContent:'center',borderBottomLeftRadius:15,borderTopLeftRadius:15,borderRightWidth:1,borderColor:dColor,backgroundColor:props.type == "OneWay" ? dColor : '#fff'}}>
               <Text style={{color:props.type == 'OneWay'? '#fff' : dColor,textAlign:'center'}}>ONEWAY</Text>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('Return')}
           style={{flex:1,justifyContent:'center',borderRightWidth:1,borderColor:dColor,backgroundColor:props.type == "Return" ? dColor : '#fff'}}>
               <Text style={{color:props.type == 'Return'? '#fff' : dColor,textAlign:'center'}}>ROUND TRIP</Text>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>props.selectType('MultiCity')}
           style={{flex:1,justifyContent:'center',borderBottomRightRadius:15,borderTopRightRadius:15,backgroundColor:props.type == "MultiCity" ? dColor : '#fff'}}>
               <Text style={{color:props.type == 'MultiCity'? '#fff' : dColor,textAlign:'center'}}>MULTI CITY</Text>
           </TouchableOpacity>
        </View>
    )
}





