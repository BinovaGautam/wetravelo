import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import { Icon } from 'native-base'
import HTML from 'react-native-render-html';
import DetailedCard from './DetailedCard.js';

const FareRule = require('./FareRule.json')

let dColor = "#026C70"
export default class JourneyDetails extends Component {
    static navigationOptions = { 
        title:'Flight Details'
    }

    submit = (data) =>{
        let {navigation} = this.props
        navigation.navigate('CheckOut',{data})
        
    }

    render() {
        let data = this.props.navigation.getParam('data',{})
        let FareRuleDetail = FareRule.FareRule.FareRuleDetail[0]
        let travellerCount = data.Price.PassengerBreakup.ADT.PassengerCount  // get sum of total travellers
        let Jlist = data ?  data.FlightDetails.Details :[]
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                    {data ?
                      Jlist.map((det,index)=>
                      <View key={index} style={{borderBottomWidth:20,borderColor:'#f5f5f5'}}>
                          <DetailedCard index={index}  details={det}/>
                      </View>
                      ) 
                        
                        : <Text>Loading</Text>}

                        {/* <WebView 
                         style={{padding:5}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         source={{ html: FareRuleDetail.FareRules  }} /> */}

                        {/* <HTML html={FareRuleDetail.FareRules} containerStyle={{padding:5}} imagesMaxWidth={Dimensions.get('window').width} /> */}
           

                    {/* <Text>{FareRuleDetail.FareRules} </Text> */}
                </ScrollView>
                <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center',marginLeft:5}}>
                        <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {parseInt(data.Price.TotalDisplayFare)} </Text>
                        {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellerCount}  {travellerCount >1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
                    </View>
                    <TouchableOpacity  activeOpacity={0.8} onPress={()=>this.submit(data)}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:16}}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}




