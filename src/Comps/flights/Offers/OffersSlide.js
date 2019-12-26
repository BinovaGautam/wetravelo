import React from 'react'
import { View, Text,ScrollView,TouchableOpacity,Image } from 'react-native'
import {strings} from '../../assets'
import ofjson from './offers.json'

let Offers = ofjson.Offers

let {darktext} = strings
const OffersSlide = props => {
    return (
        <View style={{flex:1,backgroundColor: "#f5f5f5",}}>
            <Text style={{fontSize:18,fontWeight:'500',letterSpacing:1,margin:8,color:darktext}}>OFFERS NOT TO BE MISSED</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {Offers.map((singleOffer,id)=>{
                    let {offer,img} = singleOffer
                    return(
                        <TouchableOpacity key={id} activeOpacity={0.8} style={{elevation:5,borderRadius:8,height:200,width:300,justifyContent:'center',marginHorizontal:10,backgroundColor: '#fff',}}>
                            <Image source={{uri : img}} style={{flex:1,borderTopLeftRadius:8,borderTopRightRadius:8}}/>
                            <View style={{backgroundColor: "#fff",height:30,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:0,borderBottomRightRadius:0}}>
                               <Text style={{fontWeight:'700',fontSize:12,color:darktext,textAlign:'center'}}> Use {offer} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default OffersSlide
