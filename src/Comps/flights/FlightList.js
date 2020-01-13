import React, { Component } from 'react'
import { Text, View,StatusBar,ScrollView,TouchableOpacity } from 'react-native'
import {connect} from 'react-redux' 
import JourneyDetails from './JourneyDetails.js'
import DetailCard from './DetailCard.js'
import {Loader,strings,FlightLoading} from '../assets'
import axios from 'axios'
import MultipleCard from './MultipleCard.js'
import LottieView from 'lottie-react-native';
import { Icon } from 'native-base'
import RBSheet from "react-native-raw-bottom-sheet";
import {createMaterialTopTabNavigator} from 'react-navigation'
import SplitView from './SplitView.js'
// const FlightData = require('./flightDomesticReturn.json')
const FlightData = null

let {dColor,darktext,pink,lightTeal} = strings 
const mapStateToProps = state =>({
  counter : state.counter,
  name : state.name
})

const mapDispatchToProps = dispatch =>({
    toggleHotel:() => dispatch({type:'TOGGLE_WHISHLIST'}) 
}) 

class FlightList extends Component {
     static navigationOptions =  ({navigation}) =>{ 
        let sheet = navigation.getParam('sheet')
       return {
        title:'Flights',
        headerRight: <View style={{flexDirection:'row'}}>
                      {[{title:'Sort',name:'sort',type:'MaterialIcons'},{title:'Filter',name:'filter',type:'AntDesign'}].map((item,id)=>
                          <TouchableOpacity key={id} style={{margin:10,justifyContent:'center'}} onPress={() =>id ? navigation.navigate('filter') : null} >
                          <Icon name={item.name} type={item.type} style={{textAlign:'center'}}/>
                          <Text style={{fontWeight:'500',letterSpacing:1,textAlign:'center'}}>{item.title}</Text>
                         </TouchableOpacity>
                        )}

                      
                    </View>
       }}

    constructor(props){
        super(props)
        this.state = {loading:!FlightData,
        // JourneyList:FlightData ? FlightData.Search.FlightDataList.JourneyList : null,
        // type: 'OneWay'
    }
    }

componentDidMount() {
    //bind the bottom action sheet to navigation bar
    this.props.navigation.setParams({ sheet: this.RBSheet })
     this.getFlights()
    // Initial Sort test must be removed later 
    // let {JourneyList} = this.state
    // let List = JourneyList[0].sort((a,b)=>{
    //     return a.Price.TotalDisplayFare - b.Price.TotalDisplayFare
    // })
   
    // this.setState({List,type:'Return'})
    //  this.props.navigation.navigate('JourneyDetails',{fdata:JourneyList[0][0]})

}

getFlights = () =>{  //This function calls the API to get the flight's list 
    let data = this.props.navigation.getParam('data',{
        AdultCount: 1,
        ChildCount: 0,
        InfantCount: 0,
        JourneyType: "OneWay",
        PreferredAirlines: [
        "SG"
        ],
        CabinClass: "Economy",
        Segments: [
        
        {
        Origin: "DEL",
        Destination: "BOM",
        DepartureDate: "2019-12-22T00:00:00"
        }
        ]
        })
    let type = this.props.navigation.getParam('type','OneWay')
    // console.warn(data)
    // alert(type)
    this.setState({type})
    console.log(data)
    axios({
        url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/Search',
        method: 'POST',
        headers: 
        { 
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
        let JourneyList = response.data.Status ? response.data.Search.FlightDataList.JourneyList : alert(response.data.Message||'Internal Server Error')
        // console.log(response)
        // if(JourneyDetails.length) this.setState({type:'RoundTrip'})
        this.setState({List:JourneyList[0],JourneyList,loading:false})

        console.log(response.data)
        }).catch(err => console.warn(err))  
}

sort = (sorted,id) =>{
    this.setState({List:sorted,index:id})
}

    render() {
        let {JourneyList,type,loading,List,index} = this.state
        let ListToMap = JourneyList ? List ? List : JourneyList[0] : []
        let {navigation} = this.props
        return (
            <View style={{flex:1,}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                {/* <Text>{ListToMap.length} </Text> */}
                {loading ? 
                // <LottieView source={require('../assets/lottie/10398-plane-window.json')} autoPlay loop />
                <FlightLoading/>
                 : null}
                {/* <View style={{height:50,elevation:3,backgroundColor:'#fff'}}></View>
                <View style={{height:50,elevation:3,backgroundColor:'#ddd'}}></View> */}
                <View style={{flexDirection:'row'}}></View>
                 
                 <View style={{flex:1,}}>
                    
                      {JourneyList && type ? type==='Return' ? 
                       //Check Return type is domestic or international... i.e. domestic Journeylist.length will be 2
                       JourneyList.length > 1 ?
                       //screen is divided into two parts .. Depart vs Return
                        <SplitView  navigation={navigation} JourneyList={JourneyList}/>
                       :
                       <ScrollView style={{flex:1}}>
                           { ListToMap.map((data,id)=>
                            <MultipleCard key={id} navigation={navigation} data={data} key={id}/>
                            )}
                       </ScrollView>
                      
                      :
                      type === 'Multicity' ?
                        <ScrollView style={{flex:1}}>
                                { ListToMap.map((data,id)=>
                                <MultipleCard key={id} navigation={navigation} data={data} key={id}/>
                            )}
                        </ScrollView>
                        :
                      <ScrollView style={{flex:1}}>
                      { ListToMap.map((data,id)=>
                       <DetailCard key={id} navigation={navigation} data={data} key={id}/>
                        )}
                    </ScrollView>
                    : null }
                     <Text>{this.props.name} </Text>

                 </View>

                 <RBSheet
                    ref={ref => { 
                        this.RBSheet = ref;
                    }}
                    height={300} animationType="slide" closeOnDragDown={true}
                    duration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                       
                        }
                    }}
                    >
                   <Sort JourneyList={JourneyList ? JourneyList[0] : List} index={index || 0} sort={this.sort} close={()=>this.RBSheet.close()} />
                    </RBSheet>

            </View>
        )
    }
}


let Sort = props =>{
    let {JourneyList,index} = props
    
    sort = (id) =>{
       let sorted = JourneyList.sort((a,b)=>{
           if(id < 2){
            return (a.Price.OfferedPriceRoundedOff - b.Price.OfferedPriceRoundedOff)*(id ? -1 : 1)
           }else{
               return b.StarRating - a.StarRating
           }
          
       })

       props.sort(sorted,id)
       props.close()
    }

    let items = [
                    {sortBy:'Price - Low To High'},
                    {sortBy:'Price - High To Low'},
                    {sortBy:'User Ratings'},
                    {sortBy:'Price - Low To High'},
                    {sortBy:'Price - High To Low'},
                    {sortBy:'User Ratings'},
                    {sortBy:'Price - Low To High'},
                    {sortBy:'Price - High To Low'},
                    {sortBy:'User Ratings'},
                    {sortBy:'Price - Low To High'},
                    {sortBy:'Price - High To Low'},
                    {sortBy:'User Ratings'},
    ]
    return(
        <View style={{flex:1,padding:10}}>
            <Text style={{fontSize:22,fontWeight:'600',letterSpacing:1.3,margin:10,color:darktext}}>Sort By</Text>
            <ScrollView>
                {items.map((item,id)=>{
                    return(
                        <TouchableOpacity key={id} onPress={() =>sort(id)}
                        style={{height:30,borderBottomWidth:0,borderColor:dColor,alignContent:'center',margin:10,flexDirection:'row',justifyContent:'space-between'}} activeOpacity={0.8}>
                            <Text style={{fontSize:16,fontWeight:'500',letterSpacing:1,color:dColor}}>{item.sortBy} </Text>
                            {id == index ? <Icon name="bookmark-check" type="MaterialCommunityIcons" style={{color:dColor}} /> : null}
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
           
        </View>
    )
}


// export default connect(mapStateToProps,mapDispatchToProps)(FlightList)
export default FlightList;