import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StatusBar,ScrollView,Platform,Image,Animated,Dimensions,Button} from 'react-native'
import HotelCard from '../Hotels/HotelCard';
import store from '../../store'
import {connect,useSelector} from 'react-redux'
import FlightList from '../flights/FlightList';
import {Icon} from 'native-base'
import {strings} from '../assets'
import auth from '@react-native-firebase/auth'
import Offers from '../HomeComps/Offers';
import ForYou from '../HomeComps/ForYou';
import Services from '../HomeComps/Services';
import Popular from '../HomeComps/Popular';
import Refer from '../HomeComps/Refer';
import Fetch from '../../Middleware/Fetch'

let {darktext,lightTeal} = strings
let ios = Platform.OS === 'ios'
const {width,height} = Dimensions.get('screen')

 class Home extends Component {
    static navigationOptions = ({navigation}) =>(
        {
            tabBarIcon:({ focused, horizontal, tintColor }) => 
            <View style={{backgroundColor:focused ? lightTeal : 'transparent',height:50,width:50,borderRadius:25 ,justifyContent:'center',marginTop: focused ?-25 : 0,elevation:focused?6:0}}>
            <Icon name="home" type='AntDesign' style={{color:focused?'#fff' : darktext,textAlign:'center',margin:8}} />
            </View>
        }
    ) 

    constructor(props){
        super(props)
        this.state ={scrollY : new Animated.Value(0)}
    }

    componentDidMount() {
        
        this.authlistner = auth().onAuthStateChanged(user => {
           this.setState({user,checked:true})
        }) 
    }

   componentWillUnmount() {
       if(this.authlistner) this.authlistner()
   }
    render() {
        let typeArray = [
            {name:'Flights',icon:'plane',type:'SimpleLineIcons',to:'Flights'},
            {name:'Hotels',icon:'building-o',type:'FontAwesome',to:'Hotels'},
            {name:'Buses',icon:'ios-bus',type:'Ionicons',to:'Buses'},
            {name:'Cabs',icon:'local-taxi',type:'MaterialIcons',to:'Cabs'},
            {name:'Holidays',icon:'umbrella-beach',type:'FontAwesome5',to:'Holidays'},
        ]
        let {navigation,islogged} = this.props
        let {user,checked} = this.state

        let headerTop = this.state.scrollY.interpolate({
            inputRange:[0,150],
            outputRange:[-80,12],
            extrapolate:'clamp'
        })

        let headerOpacity = this.state.scrollY.interpolate({
            inputRange:[0,150],
            outputRange:[0,1],
            extrapolate:'clamp'
        })

        return (
          
                 <View style={{marginTop:24,flex:1}}>
                        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                        
                        <Animated.View style={{height:70,padding:8,borderRadius:5,flexDirection:'row',backgroundColor: '#fff',borderBottomWidth:0.8,borderColor:'#ddd',marginTop:headerTop,opacity:headerOpacity}}>
                           { typeArray.map((item,id)=>
                            <TouchableOpacity key={id} onPress={() => navigation.navigate(item.to)}
                             style={{flex:1,margin:8,justifyContent:'center'}} activeOpacity={0.7}>
                                <Icon name={item.icon} type={item.type} style={{fontWeight:'500',textAlign:'center',color:darktext}}/>
                                <Text style={{fontWeight:'500',textAlign:'center',color:darktext,fontSize:11}}>{item.name}</Text>
                            </TouchableOpacity>
                            )}
                        </Animated.View>

                        <ScrollView style={{flex:1,backgroundColor: '#fff',}} onScroll={Animated.event(
                            [{nativeEvent: {contentOffset : { y : this.state.scrollY}}}]
                        )} >
                             
                            <Services typeArray={typeArray} navigation={navigation}/>
                            {/* <Text>{this.scrollY} </Text> */}
                           {/* {!user && checked ?
                             <View style={{margin:8,backgroundColor: '#fff',borderRadius:4,padding:8}}>
                                    <Text style={{margin:10,fontWeight:'500',color:darktext,fontSize:28,fontFamily:ios?'Optima':'sans-serif-medium'}}> Welcome</Text>
                                    <Text style={{margin:10,fontWeight:'500',color:darktext,letterSpacing:1,}}>
                                        Glad to see you here, thank you for joinig WeTravelo Family. WeTravelo provides flight,Bus tickets and hotel accomodations at best rates.
                                        </Text>

                                   <View  style={{height:30,flexDirection:'row',marginTop:10}}>
                                      <TouchableOpacity onPress={()=>navigation.navigate('SignIn')} style={{flex:1,justifyContent:'center',borderRightWidth:1,borderColor:lightTeal}} activeOpacity={0.8}>
                                          <Text style={{textAlign:'center',fontWeight:'500',color:lightTeal}}>SIGN IN</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} style={{flex:1,justifyContent:'center'}} activeOpacity={0.8}>
                                          <Text style={{textAlign:'center',fontWeight:'500',color:lightTeal}}>CREATE ACCOUNT</Text>
                                      </TouchableOpacity>
                                   </View>     
                       
                            </View> 
                            : null } */}

                            {/* <Button title="click me" onPress={() => this.props.click('Hello')}/>

                            <Text >{this.props.name} says hello {this.props.counter} times {islogged ? 'LOGGED' :'NOT'} </Text> */}
                       


                            {/* <Image source={require('../assets/Images/travellingUD.png')} style={{height:width,width:width}}/> */}

                            <Popular navigation={navigation} />

                            <Refer/>

                            <Popular navigation={navigation} />
                            
                            {/* <ForYou /> */}

                            {/* <Offers/> */}
                            


                            {/* <View style={{height:1000,justifyContent:'center',alignContent:'center'}}>
                                <Text> sample component</Text>
                            </View> */}

                           

                            {/* <View style={{margin:8,backgroundColor: '#fff',borderRadius:4,padding:8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <Text style={{margin:10,fontWeight:'500',color:darktext,fontSize:20,fontFamily:ios?'Optima':'sans-serif-medium'}}> Refer And Earn</Text>
                                    <Image source={require('../assets/Images/gift-box.png')} style={{height:50,width:50,margin:10}}/>
                                </View>
                                   
                                   

                                   <View style={{height:50,borderWidth:2,borderColor:lightTeal,borderRadius:4,justifyContent:'center',width:250,alignSelf:'center'}}>
                                        <Text style={{margin:10,fontWeight:'700',fontSize:28,textAlign:'center',color:lightTeal,letterSpacing:1}}> THWBAL </Text>
                                       </View> 

                                        <Text style={{margin:10,fontWeight:'500',color:darktext,letterSpacing:1,}}>
                                        Get a chance to earn Rewards from reffering your friends to Wetravelo. Share the referal code with your friends and get extraordinary benfits.
                                        </Text>  
                       
                            </View> 
                     */}
                     
                        </ScrollView>
                        {/* <FlightList/> */}
                        
                 </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        name : state.secondReducer.name,
        counter : state.test.counter,
        islogged : state.auth.islogged
    }
}

const mapDispatchToProps = dispatch => {
    return{
        click :fetch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home) 
//Animate on Scroll ... Add Shadow when scroll up.