import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import { Icon } from 'native-base'
import HTML from 'react-native-render-html';
import DetailedCard from './DetailedCard.js';
import {strings,Loader} from '../assets'
const FareRule = require('./FareRule.json')

let {dColor,darktext,lightTeal} = strings
export default class ReturnDetails extends Component {
    static navigationOptions = { 
        title:'Flight Details'
    }

   
    submit = (data) =>{
        let {navigation} = this.props
        let selections = data ?  data.selection :[]
        let ResultTokens = selections.map((selection) => selection.ResultToken)
        // alert(JSON.stringify(ResultTokens))
        navigation.navigate('CheckOut',{Rdata:{ResultTokens,selection:selections[0]}})
        
    }

    render() {
        let data = this.props.navigation.getParam('data',{})
        let FareRuleDetail = FareRule.FareRule.FareRuleDetail[0]
        // let travellerCount = data.Price.PassengerBreakup.ADT.PassengerCount  // get sum of total travellers
        let selections = data ?  data.selection :[]
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                    {data ?
                     selections.map((selection,id) => {
                         let Jlist = selection.FlightDetails.Details 
                         return(
                             <View style={{backgroundColor: '#fff',marginBottom:30}}>
                                 <View style={{height:40,justifyContent:'center',backgroundColor: 'transparent',margin:10,width:250}}>
                                     <Text style={{fontSize:23,fontWeight:'700',color:darktext,letterSpacing:1}}> {!id ? 'ONWAY' : 'RETURN'} </Text>
                                 </View>
                            { Jlist.map((det,index)=>
                                <View key={index} style={{borderBottomWidth:20,borderColor:'#f5f5f5'}}>
                                    <DetailedCard index={index}  details={det}/>
                                    {/* <Text> {index} </Text> */}
                                </View>
                                ) }
                            </View>    
                         )
                     })
                     
                        
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
                        <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {parseInt(data.total)} </Text>
                        {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellerCount}  {travellerCount >1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
                    </View>
                    <TouchableOpacity  activeOpacity={0.8} onPress={() => this.submit(data)}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:16}}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}




