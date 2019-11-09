import React, { Component } from 'react'
import { Text, View,StatusBar,ScrollView } from 'react-native'
import {connect} from 'react-redux' 
import JourneyDetails from './JourneyDetails.js'
import DetailCard from './DetailCard.js'
import {Loader} from '../assets'
import axios from 'axios'
import MultipleCard from './MultipleCard.js'
import LottieView from 'lottie-react-native';
// const FlightData = require('./FlightData.json')
const mapStateToProps = state =>({
  counter : state.counter,
  name : state.name
})

const mapDispatchToProps = dispatch =>({
    toggleHotel:() => dispatch({type:'TOGGLE_WHISHLIST'}) 
}) 

class FlightList extends Component {
     static navigationOptions = {
        title: 'FLIGHTS'
    }

    constructor(props){
        super(props)
        this.state = {loading:true}
    }

componentDidMount() {
   
    //  this.props.navigation.navigate('JourneyDetails',{fdata:JourneyList[0][0]})

    let data = this.props.navigation.getParam('data',{
        "AdultCount": "1",
        "ChildCount": "0",
        "InfantCount": "0",
        "JourneyType": "OneWay",
        "PreferredAirlines": [
        "SG"
        ],
        "CabinClass": "Economy",
        "Segments": [
        
        {
        "Origin": "DEL",
        "Destination": "BOM",
        "DepartureDate": "2019-11-22T00:00:00"
        }
        ]
        })
    let type = this.props.navigation.getParam('type','OneWay')
    this.setState({type})
    alert(JSON.stringify(data))
    axios({
        url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/Search',
        method: 'POST',
        headers: 
        { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'x-Password': 'test@229',
            'x-system': 'test',
            'x-DomainKey': 'TMX1512291534825461',
            'x-Username': 'test229267' },
        data:data,
        json: true })
        .then(response =>{
        console.warn('waiting.....')
        // console.log(response.data); // ex.: { user: 'Your User'}
        // console.log(response.status,'hello',response.data.Search.FlightDataList.JourneyList[0].length); // ex.: 200
        let JourneyList = response.data.status ? response.data.Search.FlightDataList.JourneyList : alert(response.data.Message||'Internal Server Error')
        // if(JourneyDetails.length) this.setState({type:'RoundTrip'})
        this.setState({JourneyList,loading:false})

        console.log(response.data)
        }).catch(err => console.warn(err))  
}

    render() {
        let {JourneyList,type,loading} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,marginTop:24,}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {loading ? <LottieView source={require('../assets/lottie/10398-plane-window.json')} autoPlay loop /> : null}
                {/* <View style={{height:50,elevation:3,backgroundColor:'#fff'}}></View>
                <View style={{height:50,elevation:3,backgroundColor:'#ddd'}}></View> */}
                <View style={{flexDirection:'row'}}></View>
                 
                 <ScrollView style={{flex:1,}}>
                      {JourneyList ? type==='RoundTrip' ? <Text>Yes Round Trip Domestic</Text> :
                       JourneyList[0].map((data,id)=>
                        <MultipleCard navigation={navigation} data={data} key={id}/>
                       )
                    : null }
                     <Text>{this.props.name} </Text>

                 </ScrollView>
            </View>
        )
    }
}


// export default connect(mapStateToProps,mapDispatchToProps)(FlightList)
export default FlightList;