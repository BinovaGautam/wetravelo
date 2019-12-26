import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView,Image,Dimensions} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {Provider} from 'react-redux'
import FlightList from '../flights/FlightList';
import {Icon} from 'native-base'
import {strings} from '../assets'
import auth from '@react-native-firebase/auth'
import {connect} from 'react-redux'


const {width,height} = Dimensions.get('screen')
let {darktext,lightTeal,silver,dColor} = strings

 class Account extends Component {
    static navigationOptions = ({navigation}) =>(
        {
            tabBarIcon:({ focused, horizontal, tintColor }) => 
            <View style={{backgroundColor:focused ? lightTeal : 'transparent',height:50,width:50,borderRadius:25 ,justifyContent:'center',marginTop: focused ?-25 : 0,elevation:focused?6:0}}>
            <Icon name="user" type="SimpleLineIcons" style={{color:focused?'#fff' : darktext,textAlign:'center',margin:8}} />
            </View>
        }
    ) 

    constructor(props){
        super(props)
        this.state = {user: null,isAnonymous:false,userDetail:{}}
    }


    componentDidMount() {
        let {authstate} = this.props
        let {islogged,user,userDetail} = authstate
        // console.warn('user details from account page',authstate)
        if(islogged){
            //user is logged in.. now check if isAnonymous 
            const isAnonymous = user.isAnonymous;
           this.setState({islogged,isAnonymous,user,userDetail})
          
        }

    }

   
    
    logout = () =>{
        auth().signOut()
    }
   
    render() {
       
        let {user,islogged,} = this.props.authstate
        let {navigation} = this.props
        const {isAnonymous,userDetail} = this.state
        const settingsArray = [
            {title:"Binova's Profile",to:'Profile',icon_name:'person-outline',icon_type:'MaterialIcons'},
            {title:"Bookings",to:'Bookings',icon_name:'file-text',icon_type:'Feather'},
            {title:"Wallet",to:'Wallet',icon_name:'wallet',icon_type:'SimpleLineIcons'},
            {title:"Notifications",to:'Notifications',icon_name:'bell',icon_type:'Feather'},
            {title:"Payment Methods",to:'PaymentMethods',icon_name:'credit-card',icon_type:'Octicons'},
]
        return (
        
                 <View style={{marginTop:50,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                       {islogged ?
                       isAnonymous ?
                       <AnonymousScreen navigation={navigation}/>
                       :
                       user ?
                       <View>
                         <View style={{height:100,flexDirection:'row',margin:10,borderBottomWidth:0.8,borderColor:silver}}>
            
                            <View style={{flex:3,marign:10}}>
                                <Text style={{margin:5,fontWeight:'700',color:darktext,fontSize:28}}> {user ? userDetail.name ? userDetail.name : 'Hello!!' : 'WeTravelo'}</Text>
                                <Text style={{margin:8,fontWeight:'500',color:darktext,fontSize:14}}> {user ? user.email : 'No Email'}</Text>
                            </View>

                            <View style={{marign:15,flex:1,alignContent:'center'}}>
                                <Image source={ user.photoURL ? {uri : user.photoURL} : require('../assets/Images/king.png')} style={{height:60,width:60}}/>
                            </View>
                            
                        </View>

                        <View style={{margin:15}}>
                            <Text style={{fontSize:18,fontWeight:'600',letterSpacing:1,color:dColor,marginBottom:20}}>ACCOUNT SETTING</Text>
                            {settingsArray.map((setting,id)=>
                             <TouchableOpacity onPress={()=> navigation.navigate(setting.to)} key={id} activeOpacity={0.8} style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0.5,borderColor:silver}}>
                                 <Text style={{margin:10,alignSelf:'center',fontSize:17,fontWeight:'600',color:darktext,letterSpacing:1}}> {setting.title} </Text>
                                 <Icon name={setting.icon_name} type={setting.icon_type} style={{alignSelf:'center',margin:10}}/>
                             </TouchableOpacity>
                            )}

                            <TouchableOpacity style={{marginTop:20,justifyContent:'center',margin:10,backgroundColor: "#f5f5f5",borderWidth:0.8,borderColor:silver,borderRadius:4}} activeOpacity={0.8} onPress={this.logout}>
                                <Text style={{margin:10,textAlign:'center',fontSize:18,fontWeight:'500',color:darktext,letterSpacing:1}}>LOGOUT</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{flex:1}}>
                    
                     
                        </ScrollView>
                    </View>  
                       :null 
                     :<AnonymousScreen navigation={navigation}/>
                    }
                 </View>
         
        )
    }
}


const AnonymousScreen = props =>{
    let {navigation} = props
    const actions = [
        {title:'SIGN IN',navigate:'SignIn'},
        {title:'SIGN UP',navigate:'SignUp'},
    ]
    return(
        <View style={{flex:1,backgroundColor: "#fff",justifyContent:'center'}}>
              <Text style={{fontSize:24,color:darktext,fontWeight:'700',letterSpacing:1,margin:20,justifyContent:'center',}}>
                    You need to login first.
                </Text>
                <Image style={{width:width,height:width*1.1}} source={require('../assets/Images/login.png')}/>

                <View style={{margin:10,flexDirection:'row',justifyContent:'space-around',flex:1,alignItems:'center'}}>
                
                {actions.map((action,id) => {
                    const {title,navigate} = action
                    return(
                        <TouchableOpacity key={id} activeOpacity={0.8} onPress={() => navigation.navigate(navigate)}
                        style={{height:40,width:150,justifyContent:'center',borderColor:lightTeal,borderWidth:2,borderRadius:5,backgroundColor: id ? lightTeal : 'transparent',}}>
                            <Text style={{fontSize:16,fontWeight:'500',textAlign:'center',color:id ? "#fff" :lightTeal,letterSpacing:1}}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
                
                </View>

           
        </View>
    )
}

const mapStateToProps = state =>{
    return {
        authstate : state.auth
    }
}



export default connect(mapStateToProps)(Account)