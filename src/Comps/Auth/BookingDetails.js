import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions,ScrollView } from 'react-native'
import {strings} from '../assets'
import FlightTicket from '../CommonComps/FlightTicket'

const {width,height} = Dimensions.get('screen')

let {darktext,dColor,lightGreen,lightTeal,pink,grey} = strings

export default class BookingDetails extends Component {
    static navigationOptions = {}
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {navigation} = this.props
        const data = navigation.getParam('data',{})
        
        return (
            <View style={{flex:1,backgroundColor: grey,}}> 
                <ScrollView style={{flex:1}}>
                    {
                        data.type ? 
                         data.type == 'flight'?
                         <FlightTicket strings={strings} data={data}/>
                         :data.type == 'hotel'?
                         <Text>hotel</Text>
                         : null
                        :

                        <View style={{height,width,backgroundColor: '#fff',justifyContent:'center'}}>
                            <Text style={{fontSize:20,color:darktext,fontWeight:'600',letterSpacing:1,textAlign:'center',marginHorizontal:40}}>
                                Something Went Wrong!
                            </Text>
                            <TouchableOpacity activeOpacity={0.6}  onPress={() => navigation.goBack()}
                             style={{backgroundColor: pink,borderRadius:5,width:150,alignSelf:'center',margin:20,height:45,justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'500',letterSpacing:1,letterSpacing:1,textAlign:'center',fontSize:15}}>GO BACK</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}
