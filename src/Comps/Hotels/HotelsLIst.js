import React, { Component } from 'react'
import { Text, View , StatusBar,ScrollView,TouchableOpacity } from 'react-native'
import HotelCard from './HotelCard.js'
import store from '../../store'
import {Provider} from 'react-redux'
import {Icon} from 'native-base'
import {isPointWithinRadius} from 'geolib'
import axios from 'axios'
import LottieView from 'lottie-react-native';
import {strings} from '../assets'
import RBSheet from "react-native-raw-bottom-sheet";

let {dColor,darktext} = strings

const Hotels = require('./HotelsList.json')


export default class HotelsLIst extends Component {
    static navigationOptions = ({navigation}) =>{ 
        let sheet = navigation.getParam('sheet')
       return {
        title:'Hotels',
        headerRight: <View style={{flexDirection:'row'}}>
                      {[{title:'Sort',name:'sort',type:'MaterialIcons'},{title:'Filter',name:'filter',type:'AntDesign'}].map((item,id)=>
                          <TouchableOpacity key={id} style={{margin:10,justifyContent:'center'}} onPress={() =>id ? navigation.navigate('filter') : sheet.open()} >
                          <Icon name={item.name} type={item.type} style={{textAlign:'center'}}/>
                          <Text style={{fontWeight:'500',letterSpacing:1,textAlign:'center'}}>{item.title}</Text>
                         </TouchableOpacity>
                        )}

                      
                    </View>
       }}
    constructor(props){
        super(props)
        this.state = {HotelResults:[],loading:true,header:[]}
    }

    check = (a,b,c) =>{
        return a+b === c
    }

    getHotelsList = async() =>{
        const  monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
         let {navigation}  = this.props
         let navparams =  navigation.state.params || {}
          let {citydetails,address,CheckInDate,NoOfNights,RoomGuests,GuestNationality,NoOfRooms,NoOfGuests} = navparams
          
         let {city_code,country_code,city_name} = citydetails 
         let {lat,lng} = address.geometry.location
         let date = new Date(CheckInDate)
         let chekin_date =`${date.getDate() < 10 ? '0'+date.getDate() :date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
           let data = {
                CheckInDate: chekin_date ||  "27-11-2019",
                NoOfNights: NoOfNights || 2,
                CountryCode: country_code || "IN",
                CityId: parseInt(city_code) || 6743,
                GuestNationality: GuestNationality || "IN",
                NoOfRooms: NoOfRooms || 1,
                RoomGuests
        }

        let header = [
            {title:city_name,to:'SearchPlace'},
            {title:`${NoOfNights} ${NoOfNights > 1 ? 'Nights' : 'Night'} from ${chekin_date.substr(0,2)} ${monthArray[date.getMonth()]}`,to:'SelectDateRange'},
            {title:`${NoOfGuests} Guests`,to:'SelectGuests'},
        ]
        
        this.setState({header})

        // console.warn(data)
      
            axios({
                url: 'http://test.services.travelomatix.com/webservices/index.php/hotel_v3/service/Search',
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
                console.log('waiting.....')
                 let Hotels = response.data
                 console.log(Hotels.Status,'status')
                //  alert(JSON.stringify(Hotels))
                console.warn(Hotels)
                 if(Hotels.Status){
                    let HotelResults = Hotels.Search.HotelSearchResult.HotelResults
                    HotelResults = HotelResults.filter((hotel)=> {
                      let bool = isPointWithinRadius(
                        { latitude: parseFloat(hotel.Latitude), longitude: parseFloat(hotel.Longitude)},
                        { latitude: lat || 12.95967, longitude: lng || 77.64886 },
                        5000
                    )
                   return bool
                  }
                    )
                    this.setState({HotelResults,loading:false })
                    // navigation.navigate('HotelDetails',{data:HotelResults[5]})
                }else{
                    alert(Hotels.Message || 'Internal Server Error.')
                    this.setState({loading:false})
                }
                }).catch(err =>{
                      alert(JSON.stringify(err))
                      this.setState({loading:false})
                })
        
    }

    componentDidMount = () => {
    //   alert(Hotels.Status)
    this.props.navigation.setParams({ sheet: this.RBSheet })
    // if(Hotels.Status){
    //     let HotelResults = Hotels.Search.HotelSearchResult.HotelResults
    //     HotelResults = HotelResults.filter((hotel)=> {
    //       let bool = isPointWithinRadius(
    //         { latitude: parseFloat(hotel.Latitude), longitude: parseFloat(hotel.Longitude)},
    //         { latitude: 12.95967, longitude:  77.64886 },
    //         8000
    //     )
    //    return bool
    //   }
    //     )
    //     this.setState({HotelResults,loading:false })
    //     // navigation.navigate('HotelDetails',{data:HotelResults[5]})
    // }else{
    //     alert('Internal Server Error.')
    //     this.setState({loading:false})
    // }

     this.getHotelsList()
    };
    
    change = head =>{
        let {navigation} = this.props
        let {title,to} = head
        // navigation.navigate(to)
    }

    sort = (sorted,id) =>{
        this.setState({HotelResults:sorted,index:id})
    }
    render() {
        let {HotelResults,loading,index,header} = this.state
        let {navigation} = this.props
       
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                    <View style={{height:50,elevation:6}}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex:1}}>
                                {header.map((head,id) =>{

                                    return(
                                        <TouchableOpacity onPress={() => this.change} key={id} activeOpacity={0.8} style={{margin:8,borderWidth:1,borderColor:dColor,borderRadius: 15,justifyContent:'center',height:30}}>
                                            <Text style={{fontSize:14,fontWeight:'500',letterSpacing:1,textAlign:'center',marginHorizontal:12}}>{head.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                    </View>
                    {!loading ? HotelResults.length  ?
                        <ScrollView style={{flex:1}}>
                            { HotelResults.map((hotel,id)=>
                            <HotelCard navigation={navigation}  hotel={hotel} key={id} index={id}   />
                            ) }
                        </ScrollView>
                     : 
                     <View style={{flex:1,justifyContent:'center'}}>
                         <Text style={{marginHorizontal:50,textAlign:'center',color:darktext,fontSize:24,fontWeight:'500',letterSpacing:0}}>
                             No Hotels Found In The Area You Are Looking For.
                         </Text>
                     </View>
                    : <LottieView source={require('../assets/lottie/10398-plane-window.json')} autoPlay loop />
                }
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
                   <Sort HotelResults={HotelResults} index={index || 0} sort={this.sort} close={()=>this.RBSheet.close()} />
                    </RBSheet>

                        </View>
            </Provider>
            
        )
    }
}



let Sort = props =>{
    let {HotelResults,index} = props
    
    sort = (id) =>{
       let sorted = HotelResults.sort((a,b)=>{
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
    ]
    return(
        <View style={{flex:1,padding:10}}>
            <Text style={{fontSize:22,fontWeight:'600',letterSpacing:1.3,margin:10,color:darktext}}>Sort By</Text>
            {items.map((item,id)=>{
                return(
                    <TouchableOpacity key={id} onPress={() =>sort(id)}
                    style={{height:30,borderBottomWidth:0,borderColor:dColor,alignContent:'center',margin:10,flexDirection:'row',justifyContent:'space-between'}} activeOpacity={0.8}>
                        <Text style={{fontSize:16,fontWeight:'500',letterSpacing:1,color:dColor}}>{item.sortBy} </Text>
                        {id == index ? <Icon name="bookmark-check" type="MaterialCommunityIcons" style={{color:dColor}} /> : null}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}