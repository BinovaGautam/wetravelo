import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,StyleSheet} from 'react-native'
import { Icon ,Card,CardItem,Right,CheckBox,Body,ListItem,Form, Item, Input, Label} from 'native-base'
import { iOSUIKit } from 'react-native-typography'
import Snackbar from 'react-native-snackbar'
import {strings, Loader} from '../assets'
import axios from 'axios'
import {connect} from 'react-redux'

// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal,pink} = strings

 class Booking extends Component {
    static navigationOptions = { 
        title:'Booking Details'
    }

    constructor(props){
        super(props)
        this.state ={
           
        }
    }

    componentDidMount() {
        this.getUser()
        let {navigation} = this.props
        let travellers = navigation.getParam('travellers',[])
        let ResultToken = navigation.getParam('ResultToken',null)
        // alert(ResultToken)

        axios({
            url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote',
            method: 'POST',
            headers: 
            { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'x-Password': 'test@229',
                'x-system': 'test',
                'x-DomainKey': 'TMX1512291534825461',
                'x-Username': 'test229267' },
            data:{ResultToken},
            json: true })
            .then(response =>{
            console.log('waiting.....')
            // console.log(response.data); // ex.: { user: 'Your User'}
            // console.log(response.status,'hello',response.data.Search.FlightDataList.JourneyList[0].length); // ex.: 200
            let JourneyList = response.data.Status ?  response.data.UpdateFareQuote.FareQuoteDetails.JourneyList : null
            // if(JourneyDetails.length) this.setState({type:'RoundTrip'})
            JourneyList ?  this.setState({JourneyList,loading:false}) : alert('Failed, Booking cannot proceed try again')
    
            console.log(response.data)
            }).catch(err =>{
                console.log(err)
            })

        let Passengers = []
        travellers.map((traveller,id)=>{
            let {list} = traveller
            // delete list['country']
            let PassengersList = list.map((item,id) => {
                let {Title,FirstName,LastName,PaxType,Gender,DateOfBirth,CountryCode,CountryName} = item
                let itemObj =  {Title,FirstName,LastName,PaxType,Gender,DateOfBirth,CountryCode,CountryName}
                return itemObj

            })
            Passengers.push(...PassengersList)

            if(id+1 == travellers.length) this.setState({Passengers,ResultToken})
        })
        
    }

    getUser = () =>{
        let {auth} = this.props
        let {islogged,user,userDetail} = auth
        let {email,phoneNumber} = user
        // alert(JSON.stringify(user))
        this.setState({email,phoneNumber})
    }
    
    getList =(list,id) =>{
        let {travellers} = this.state
        travellers[id].list =  list
        this.setState({list})

    }

    submit = () =>{
        this.setState({submit:true})
        let {Passengers,phone,email,JourneyList} = this.state
        let {navigation} = this.props
        if(Passengers && phone && email && JourneyList ){
              Passengers.map((Passenger,id)=>{
                  let obj = {ContactNo: phone ,IsLeadPax:'1', Title: 'Mr' ,City:'Delhi',PinCode:'110007',AddressLine1:'wahi pe',Email:email}
                  Object.assign(Passenger,obj)
                  if(id+1 == Passengers.length) navigation.navigate('Payment',{JourneyList,Passengers})
              })
        }else{
            Snackbar.show({
                title:'Please Fill Both Fields'
            })
        }

    }
    
    

    render() {
        let {navigation} = this.props
        let data = navigation.getParam('data',{})
        let ios = Platform.OS === 'ios' ? true : false
        let {travellers,submit,phone,email,loading} =  this.state
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                   
                      <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                          <Text style={{color:dColor,margin:8}}>Step 2 of 4</Text>
                          <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5} ]}>Contact Information</Text>
                          
                          <Form style={{marginTop:50}}>
                                          
                                            
                                          <Item floatingLabel>
                                          <Label style={{color:submit && !email ? pink : dColor}}>Email</Label>
                                          <Input  autoCapitalize="words" value={email || ''} autoFocus={true} onChangeText={name =>{this.setState({email:name})}} />
                                          
                                              
                                          </Item>
                                          <Item floatingLabel>
                                          <Label style={{color:submit && !phone ? pink : dColor}}>Phone Number</Label>
                                          <Input keyboardType='numeric' autoCapitalize="words" value={phone || ''} onChangeText={name =>{this.setState({phone:name})}} />
                                          </Item>
                            </Form>   

                            {loading ? <Loader/> : null}

                           

                      </View>
                     
                        
                        

                </ScrollView>
                <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        {/* <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ {parseInt(data.Price.TotalDisplayFare)} </Text> */}
                        {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellerCount}  {travellerCount >1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
                    </View>
                    <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18}}>NEXT</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}


 const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(Booking)