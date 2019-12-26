import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform,StyleSheet} from 'react-native'
import { Icon ,Card,CardItem,Right,CheckBox,Body,ListItem} from 'native-base'
import { iOSUIKit } from 'react-native-typography'
import Snackbar from 'react-native-snackbar'
import {strings} from '../assets'
import Axios from 'axios'

// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal} = strings

export default class GuestDetails extends Component {
    static navigationOptions = { 
        title:'Guest Details'
    }

    constructor(props){
        super(props)
        this.state ={
            travellers :  [
                                {title:'Adults',name:'AdultCount',list:[],value : 2,description:'Ages Above 12 Years'},
                                {title:'Children',name:'ChildCount',list:[],value : 0,description:'Ages 2 - 12 Years'},
                            ]
        }
    }

    BlockRoom = () =>{
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        
        let {ResultToken,RoomUniqueId} = navparams
        this.setState({ResultToken})
        Axios({
            url: 'http://test.services.travelomatix.com/webservices/index.php/hotel_v3/service/BlockRoom',
            method: 'POST',
            headers: 
            { 'Postman-Token': 'eac38801-9d91-407e-be63-f9f19006d0af',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'x-Password': 'test@229',
                'x-system': 'test',
                'x-DomainKey': 'TMX1512291534825461',
                'x-Username': 'test229267' },
            data:{ResultToken,RoomUniqueId},
            json: true })
            .then(response =>{
            console.log('waiting.....')
             let RoomJson = response.data
             console.log(RoomJson.Status,'status')
            //  alert(JSON.stringify(RoomJson))
             if(RoomJson.Status){
                let BlockRoomResult = RoomJson.BlockRoom.BlockRoomResult
               
                   this.setState({blocked:true,BlockRoomResult})
            }else{
                alert(RoomJson.Message || 'Internal Server Error.')
                this.setState({blocked:true})
            }
            }).catch(err =>{
                  alert(JSON.stringify(err))
            })
    }

    componentDidMount() {
        this.BlockRoom()

        // let {navigation} = this.props
        // navigation.setParams({getList : this.getList})
        // let data = navigation.getParam('data',null)
        // let {travellers} = this.state

        // if(data){
        //     let {Price,ResultToken} = data
        //     let {PassengerBreakup} = Price
        //     let keyArray =  Object.keys(PassengerBreakup)
        //       keyArray.map((key,id)=>{
        //             let index = key == 'ADT' ? 0 :key == 'CHD' ? 1 : 2
        //             travellers[index].value = PassengerBreakup[key].PassengerCount
        //             if(id+1 == keyArray.length){
        //                 this.setState({travellers,ResultToken})
        //             }
        //     })
        // }
    }
    
    getList =(list,id) =>{
        let {travellers} = this.state
        travellers[id].list =  list
        this.setState({list})

    }
    
    remove =(id,index) => {
        let {travellers} = this.state
        let {FirstName , LastName} = travellers[id]
       
        Snackbar.show({
            title:`Remove ${FirstName} ${LastName} from the list?`,
            action:{
                title:'OK',
                color: lightTeal,
                onPress : () =>{
                    travellers[id].list.splice(index,1)
                    this.setState({travellers})
                }
            }
        })
        
    }

    submit = () =>{
        let {travellers,blocked,BlockRoomResult,ResultToken} = this.state //also add the resultToken of the flight selected.
        let verified = true
        let {navigation} = this.props
        let PassengerDetails = []
        travellers.map((traveller,id)=>{
            let {list,value,title} = traveller
            /*
             Approaching this problem
             
            */
           PassengerDetails.push(...list)

            verified = verified ? value - list.length ? false : true : false
           
                if(id+1 == travellers.length ){
                //     if(verified) alert(JSON.stringify(travellers.reduce((a,b)=>{
                //         return [a]
                //     })))

                  //passengerdetails for single room booking .. 
                   
                     verified &&  blocked ? navigation.navigate('ReviewBook',{travellers,BlockRoomResult,ResultToken,PassengerDetails}) : Snackbar.show({title:'Please Select All The Travellers'})
                   }
          
           
            
          
        })
    }

    render() {
        let {navigation} = this.props
        let data = navigation.getParam('data',{})
        let ios = Platform.OS === 'ios' ? true : false
        let {travellers} =  this.state
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                   
                      <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                          <Text style={{color:dColor}}>Step 1 of 4</Text>
                          <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium'} ]}>Guest Details</Text>

                          {/* <Text style={{fontWeight:'600',color:darktext,marginTop:20,fontSize:17,fontFamily:ios ? 'Palatino' : 'sans-serif-medium'}}>You Have Not Added Any Passenger.</Text> */}
                          {travellers ?
                            travellers.map((traveller,id)=>{
                                let {title,name,value,description,list} = traveller
                                if(value){
                                    return(
                                        <View  key={id} style={{padding:10,borderBottomWidth:1,marginTop:15,borderColor:'#ddd',borderRadius:5}}>
                                            <View style={{flexDirection:'row'}}>
                                              <Text style={[{fontSize:24,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',flex:2} ]}>{title}</Text>
                                              <Text style={[{fontSize:24,fontWeight:'600',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',flex:1,textAlign:'right'} ]}>
                                                  {list.length} / {value} </Text>
                                            
                                            </View>
                                            
    
                                            <Card>
                                            
                                          {list.length ?  list.map((item,index)=>
                                          <ListItem key={index} >
                                                {/* <CheckBox checked={item.active} /> */}
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.remove(id,index)} style={{justifyContent:'center'}}>
                                                    <Icon name="delete" type="AntDesign" style={{fontSize:20,margin:8}} />
                                                </TouchableOpacity>
                                                 <TouchableOpacity onPress={() => navigation.navigate('GuestForm',{title,list,id,getList : this.getList,edit:{item,index}})} activeOpacity={0.8}
                                                  style={{justifyContent:'space-between',flexDirection:'row',flex:1}}>
                                                    <Body>
                                                    <Text style={{fontWeight:'500',fontSize:16}}>  {item.FirstName} {item.LastName} </Text>
                                                    
                                                    </Body>
                                                    <Right>
                                                        <Icon name="arrow-forward" />
                                                    </Right>
                                                 </TouchableOpacity>
                                            </ListItem>
                                          ) : 
                                          <Text style={{fontSize:16,fontWeight:'500',color:'#000',textAlign:'center',margin:10,}}> Nothing Added. </Text>
                                            
                                          }
                                          
                                            </Card>
                                             <TouchableOpacity disabled={value - list.length ? false : true} onPress={()=>navigation.navigate('GuestForm',{title,list,id,getList : this.getList,length:list.length})}
                                             activeOpacity={0.8}  style={{backgroundColor:'#00b894',justifyContent:'center',margin:20,opacity :  value - list.length ? 1 : 0.4 }}>
                                                 <Text style={{fontSize:16,fontWeight:'500',color:'#fff',textAlign:'center',marginVertical:10,}}> ADD  {title.toUpperCase()} </Text>
                                             </TouchableOpacity>
    
                                        </View>
                                    )
                                }
                            })
                            : null}
                      </View>
                     
                        
                        

                        {/* <WebView 
                         style={{padding:5}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         source={{ html: FareRuleDetail.FareRules  }} /> */}

                        {/* <HTML html={FareRuleDetail.FareRules} containerStyle={{padding:5}} imagesMaxWidth={Dimensions.get('window').width} /> */}
           

                    {/* <Text>{FareRuleDetail.FareRules} </Text> */}
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


const styles = StyleSheet.create({

})