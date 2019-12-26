import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StatusBar,ScrollView,Image,Dimensions,ImageBackground } from 'react-native'
import {strings,Loader} from '../assets'
import Collapsible from 'react-native-collapsible';
import { Icon } from 'native-base';
import PlacesCard from './PlacesCard';

let {dColor,darktext,lightGreen,lightTeal,silver,pink} = strings
let {width,height} = Dimensions.get('screen')

let length = width*0.9

export default class SingleCat extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    
    
    render() {
        let {navigation} = this.props
        let data = navigation.getParam('data',null)
        let {title,category,plans} = data ? data : {}
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                { 
                data ?
                 <View style={{flex:1}}>
                    <Text style={{fontWeight:'700',fontSize:23,color:darktext,margin:10}}> {title} </Text>

                    {/* <View style={{}} */}


                    <ScrollView style={{flex:1}} >
                          <View style={{flexWrap:'wrap',flexDirection:'row'}} >

                                {plans.map((plan,index) => 
                                    <PlacesCard plan={plan} navigation={navigation} key={index}   />
                                )}

                        </View>
                    </ScrollView>
                  </View> 
                   :
                   <View style={{justifyContent:'center',flex:1}}>
                       
                       <Text style={{marginHorizontal:30,margin:10,color:pink,textAlign:'center',fontWeight:'700',fontSize:28}}> Nothing Found Here!</Text>
                       <Image source={require('../assets/Images/void.png')} style={{height:width, width:width ,alignSelf:'center'}}/>
                   </View>
                  }
            </View>
        )
    }
}
