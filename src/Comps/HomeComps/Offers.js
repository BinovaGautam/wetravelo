import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions,Image,ImageBackground } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {strings} from '../assets'
import { Icon } from 'native-base';

const {dColor,darktext,refer_img,slider_back,lightGreen,silver} = strings
const {width,height}  = Dimensions.get('screen')

export default class Offers extends Component {
    constructor(props){
        super(props)
        this.state = {entries : ['Jan','Feb','March','April','May','June','July','August']}
    }

    _renderItem ({item, index}) {
        return <SlideComp data={item} />
    }

    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'transparent' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render () {
   
        return (
            <View style={{borderBottomWidth:0.8,borderColor:lightGreen}}>
                <View style={{backgroundColor: "#fff",flexDirection:'row',height:60,alignItems:'center',justifyContent:'space-between',}}>
                    <Text style={{fontSize:18,fontWeight:'500',color:darktext,letterSpacing:1,margin:10}}>PACKAGES FOR YOU</Text>
                    {/* <Image source={require('../assets/Images/notice.png')} style={{height:30,width:30,margin:10,alignSelf:'center'}}/> */}
                      <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:silver,justifyContent:'center',margin:10,borderRadius:4}}>
                            <Text style={{fontSize:16,fontWeight:'500',color:dColor,letterSpacing:1,textAlign:'center',margin:10}}>SEE ALL</Text>
                        </TouchableOpacity>

                </View>
                <ImageBackground source={{uri: 'slider_back'}} style={{width: width,height:250,alignSelf:'center'}}>
                    <Carousel
                        hasParallaxImages={true}
                        sliderWidth={width}
                        itemWidth={width*0.7}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                </ImageBackground>
               
                {/* { this.pagination } */}
                {/* <TouchableOpacity style={{height:40,borderWidth:1.2,borderColor:dColor,justifyContent:'center',margin:20,borderRadius:4}}>
                    <Text style={{fontSize:16,fontWeight:'500',color:dColor,letterSpacing:1,textAlign:'center'}}>SEE ALL</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}


const SlideComp = props => {
    let {data} = props
    const shadow = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22, elevation:3
    }
    return(
        <TouchableOpacity activeOpacity={0.8} style={{height:200,margin:10,backgroundColor: '#fff',marginTop:20,borderRadius:5,...shadow}}>
            <Image source={{uri : refer_img}} style={{flex:1,borderTopLeftRadius:5,borderTopRightRadius:5}}/>
            <Text style={{textAlign:'center',fontSize:18,margin:10,fontWeight:'700',color:darktext}}> {data} </Text>
        </TouchableOpacity>
    )
}