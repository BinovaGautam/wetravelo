import React, { Component } from 'react'
import { Text, View,StatusBar,ScrollView,TouchableOpacity,Dimensions } from 'react-native'
import {strings,Loader} from '../assets'
import { Table, Row, Rows } from 'react-native-table-component';

const {dColor,darktext,lightGreen,lightTeal} = strings
const Seats = require('./seatLayout.json');
const {width,height} = Dimensions.get("window")

export default class SelectSeats extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount() {
        if(Seats.Status){
            // alert(Seats.Status)
            let layoutData = Seats.SeatLayout.result
            this.setState({layoutData})
        }
    }

    render() {
        let layoutData = this.state.layoutData
        let {value,layout} = layoutData ? layoutData : {}
        let {MaxRows,MaxCols} = layout ? layout : {}
        let length = (width-16)/5
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={true}/>
                {layoutData ? 
                <View style={{flex:1,}}>
                    <ScrollView style={{flex:1}}>
                        <View style={{margin:8,flexWrap:'wrap',flexDirection:'row' }}>
                            
                          {value.map((item,id)=>
                            <TouchableOpacity style={{justifyContent:'center',borderWidth:1,height:length,width:length}}>
                                    <Text style={{textAlign:'center'}}>{item.seat_no} </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                    </ScrollView>

                </View>
                :
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontWeight:'700',fontSize:20,color:darktext,marginHorizontal:20,textAlign:'center'}}>
                        Sorry, Seat Selection Is Not Available for Now.
                    </Text>
                </View>
                }
                
            </View>
        )
    }
}
