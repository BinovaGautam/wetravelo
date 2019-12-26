import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StyleSheet  } from 'react-native'
import {strings} from '../assets'
import {connect} from 'react-redux'
import { Icon } from 'native-base'
let {darktext,dColor,lightTeal,silver} = strings

class MultiCitySearch extends Component {
    constructor(props){
        super(props)
        
        this.state = { activeIndex:0,
            trips : []
        }
    }

    componentDidMount() {
        let {recent} = this.props
        let {flight} = recent || {}
        let trips = [
                    {from : flight.from,to:flight.to,date: null},
        ]

        this.setState({trips})
    }

    getPort = (data) => {
        // alert(JSON.stringify(data))
        let {trips,activeIndex,activeType} = this.state
        trips[activeIndex][activeType] = data
        this.setState({trips})

        let Segments = trips.map((trip) => {
            let {from,to,DepartureDate} = trip
            return {Origin:from ? from.IATA : null , Destination : to ? to.IATA : null , DepartureDate}
        })

        this.props.getSegment(Segments)

    }

    selectPort = (id,type) =>{
            let {navigation} = this.props
            this.setState({activeIndex:id,activeType:type})
            navigation.navigate('SelectPort',{type:this.getPort})
    }

    selectDate = (id) => {
        let {navigation} = this.props
        this.setState({activeIndex:id})
        navigation.navigate('SelectDate',{getDay:this.getDay})
    }

    getDay = (date,string) =>{
        let {trips,activeIndex} = this.state
        trips[activeIndex].date = date
        trips[activeIndex].DepartureDate = string

        this.setState({trips})

        let Segments = trips.map((trip) => {
            let {from,to,DepartureDate} = trip
            return {Origin:from ? from.IATA : null , Destination : to ? to.IATA : null , DepartureDate}
        })

        this.props.getSegment(Segments)
    }

    render() {
        let {trips} = this.state
        let {navigation,weekdays,months} = this.props
        return (
            <View>
                {trips.map((trip,id) =>{
                    let {from,to,date} = trip
                    return(
                        <View key={id} >
                            <View activeOpacity={0.8} style={{height:70,borderWidth:1,borderColor:'#c0c4cc',borderRadius:4,justifyContent:'center',marginTop:10,padding:5,flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={0.8} style={{flex:1}}  onPress = {() => this.selectPort(id,'from')}>
                                        <Text style={{fontWeight:'400', marginHorizontal:8,fontSize:12}}>{!from ? null : 'FROM' }</Text>
                                        
                                            <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize:from ? 17 : 20,letterSpacing:1}}>{from ? from.IATA :'From'}</Text>
                                            <Text style={{fontWeight:'700',color:darktext,marginHorizontal:8, fontSize:15,letterSpacing:1}}>{from ? from.City :null}</Text>
                                        
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.8} style={{flex:1}}   onPress = {() => this.selectPort(id,'to')}>
                                        <Text style={{fontWeight:'400',marginHorizontal:8,fontSize:12}}>{!to ? null :'TO'}</Text>
                                        
                                            <Text style={{fontWeight:'700',color:dColor,marginHorizontal:8, fontSize: to ? 17 : 20,letterSpacing:1}}>{to ? to.IATA :'To'}</Text>
                                            <Text style={{fontWeight:'700',color:darktext,marginHorizontal:8, fontSize:15,letterSpacing:1}}>{to ? to.City : null}</Text>
                                        
                                    </TouchableOpacity>                    

                                    <TouchableOpacity activeOpacity={0.8} style={{flex:1}}   onPress = {() => this.selectDate(id)}>
                                        <Text style={{fontWeight:'400',marginHorizontal:8,fontSize:12}}>{!date ? null :'DATE'}</Text>
                                        
                                            
                                                <Text style={{fontWeight:'700',fontSize:20,color:dColor,textAlign:'left'}}> {date ?date.getDate() + ' ' + months[date.getMonth()]: 'Date'} </Text>
                                                {date ? <Text style={{color:darktext,marginHorizontal:3}}>{weekdays[date.getDay()]}</Text>: null}
                                        
                                    </TouchableOpacity>

                                    {id ?
                                    <TouchableOpacity style={{width:40,justifyContent:'center'}} activeOpacity={0.7} onPress={() => this.removeRow(id)}>
                                        <Icon name="closecircleo" type="AntDesign" style={{textAlign:'center',color:lightTeal,fontWeight:'700'}}/>
                                    </TouchableOpacity>:
                                     <View style={{width:40}}/>
                                    }
                                </View>
                    </View>
                    )
                })}

                <TouchableOpacity activeOpacity={0.8} onPress={this.increaseRow} style={{height:50,justifyContent:'center',backgroundColor: '#f5f5f5',borderRadius:5,marginVertical:5}}>
                    <Text style={{textAlign:'center',fontWeight:'700',color:lightTeal,fontSize:18}}>Add City</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // functions for the render method goes here

    increaseRow  = () =>{
        let {trips} = this.state
        let lastRow = trips[trips.length - 1]
        let newRow = {from : lastRow.to, to : null ,date : null}
        trips.push(newRow)
        this.setState({trips})
    }

    removeRow = (id) => {
        let {trips} = this.state
        trips.splice(id,1)
        this.setState({trips})
    }
}


const styles = StyleSheet.create({
    box : {height:70,borderWidth:1,borderColor:'#c0c4cc',borderRadius:4,justifyContent:'center',marginTop:10,padding:5,flexDirection:'row'}
})

const  mapStateToProps = (state) => {
    return {
        recent : state.auth.userDetail.recent || {} ,  //recent searches
        flight : state.flight.recent || {}   
    }
}

export default  connect(mapStateToProps)(MultiCitySearch)