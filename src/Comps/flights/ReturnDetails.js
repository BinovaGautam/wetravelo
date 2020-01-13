import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import { Icon } from 'native-base'
import HTML from 'react-native-render-html';
import DetailedCard from './DetailedCard.js';
import {strings,Loader} from '../assets'
// const FareRule = require('./FareRule.json')

let {dColor,darktext,lightGreen,silver ,pink,} = strings
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
        // let FareRuleDetail = FareRule.FareRule.FareRuleDetail[0]
        // let travellerCount = data.Price.PassengerBreakup.ADT.PassengerCount  // get sum of total travellers
        let selections = data ?  data.selection :[]
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1,backgroundColor: silver,}}>
                    {data ?
                     selections.map((selection,id) => {
                         let Jlist = selection.FlightDetails.Details 
                         let {IsRefundable} = selection.Attr || {}
                         return(
                             <View key={id} style={{marginBottom:!id ? 20 : 0,backgroundColor: '#fff',}}>
                                 <View style={{height:40,alignContent:'center',backgroundColor: 'transparent',margin:10,width:250,flexDirection:'row'}}>
                                    <Icon name="ios-airplane" style={{marginHorizontal:8,marginTop:5,alignSelf: 'center',transform: [{ rotate:!id ? '0deg': '180deg' }]}}  />
                                   
                                     <Text style={{fontSize:20,fontWeight:'700',color:darktext,letterSpacing:1,alignSelf:'center'}}> 
                                     {!id ? ' ONWAY' : ' RETURN'}
                                     
                                      </Text>
                                 </View>
                            {  Jlist.map((det,index)=>
                                    <View key={index} >
                                        <View style={{marginBottom:index ? 0 :10,marginTop:index? 10 : 0,backgroundColor: '#fff',}}>
                                            <DetailedCard index={index}  details={det}/>
                                        </View>
                                        {!index ? 
                                        <View style={{margin:8,borderWidth:0 ,padding:8,borderRadius:4,backgroundColor:IsRefundable ? lightGreen : pink,}}>
                                                <Text style={{margin:8,color:'#fff',fontWeight:'700',letterSpacing:1,fontSize:14}}>{IsRefundable ? 'REFUNDABLE' : 'NON-REFUNDABLE'} </Text>
                                            </View>
                                        : null}
                                    </View>
                      )  }
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




