import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StatusBar,ScrollView,Image,Dimensions } from 'react-native'
import {strings,Loader} from '../assets'
import Collapsible from 'react-native-collapsible';
import { Icon } from 'native-base';
import PlacesCard from './PlacesCard';

let {dColor,darktext,ghtGreen,lightTeal,silver,INR} = strings

const Holidays = require('./Holidays.json')
let {width,height} = Dimensions.get('screen')

let length = width*0.43
export default class HolidaysCat extends Component {
    static navigationOptions = ({navigation})=> ({
        // header: null,
        // title:'Search Flight',
        headerLeft: <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} activeOpacity={0.6}>
                            <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} onPress={()=>navigation.navigate('Home')} />
                    </TouchableOpacity>
    })
    constructor(props){
        super(props)
        this.state = {
            Packages : Holidays.Packages
        }
    }

    componentDidMount() {
        // alert(Holidays.Packages.length)
        let {Packages} = this.state
        Packages.push(Packages[0])
        this.setState({Packages})

        // let {navigation} = this.props
        // navigation.navigate('SingleCat',{plan: Packages[0].plans[0]})
    }
    render() {
        let {Packages} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor: '#fff',}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                    {Packages.map((item,id)=>{
                        let {category,plans} = item
                        return(
                            <View style={{marginVertical:10,borderBottomWidth:1,borderColor:"#ddd"}}  key={id} >

                                <TouchableOpacity style={{flexDirection:'row',marginHorizontal:8}} activeOpacity={0.7} onPress={()=>navigation.navigate('SingleCat',{data : item})} >
                                    <Text style={{fontWeight:'500',letterSpacing:1,fontSize:18,color:darktext,margin:8,flex:1}}> {item.title} </Text>
                                    <Icon name="arrowright" type='AntDesign' style={{margin:8,textAlign:'center',color:darktext}}/>
                                </TouchableOpacity>
                                
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical:8}} >

                                        {plans.map((plan,index) => 
                                            <PlacesCard plan={plan} navigation={navigation} key={index}   />
                                        )}

                                </ScrollView>
                            </View>
                        )
                    })}
                </ScrollView>
               
            </View>
        )
    }
}

