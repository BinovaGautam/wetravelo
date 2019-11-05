import React, { Component,useRef,useState } from 'react'
import { Text, View , StatusBar,Platform,Image,Dimensions,StyleSheet,TouchableOpacity} from 'react-native'
import { Loader,strings } from '../assets'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html';
import { SliderBox } from 'react-native-image-slider-box';
import Carousel, { Pagination,ParallaxImage } from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')

let SingleHotel = require('./SingleHotel')
let data = SingleHotel.HotelDetails.HotelInfoResult.HotelDetails
let {dColor,darktext,lightTeal} = strings
let ios = Platform.OS === 'ios' ? true : false
export default class HotelDetails extends Component {
    constructor(props){
        super(props)
        this.state = {loading:true}
    }

    componentDidMount() {
        let {navigation} = this.props
        // let data = navigation.getParam('data',null)
        if(data) this.setState({data,loading:false})
    }
    
    render() {
        let {data,loading} = this.state
        
        return (
            <View style={{flex:1}}>
                {loading ? <Loader/>: null}
                 <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#fff"/>
                 {data ? 
                  
                     <View style={{flex:1}}>
                         <ScrollView style={{flex:1}}>
                            <DetailCard data={data}/>
                         </ScrollView>
                     </View>
                    :null}
                  <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center',marginLeft:5}}>
                        <Text style={{color:'#000',fontSize:24,fontWeight:'500'}}>₹ 1234 </Text>
                        {/* <Text style={{color:dColor,fontWeight:'500'}}>FOR {travellerCount}  {travellerCount >1 ?'TRAVELLERS' : 'TRAVELLER'}</Text> */}
                    </View>
                    <TouchableOpacity  activeOpacity={0.8} onPress={()=>this.submit(data)}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:16}}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


DetailCard = props =>{
    let {data} = props
    let {HotelName,StarRating,Description,HotelPicture,Address,Images,HotelFacilities,Amenities} = data
    
    const carouselRef = useRef(null)

   const [activeSlide,setSlide] = useState(0);

    const renderItem = ({item, index}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.3}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text>
            </View>
        );
    }
    return(
        <View style={{flex:1,}}>
              {/* <Image  style={{ height: 250,width:'auto' }} source={{ uri:HotelPicture  }} /> */}
              {/* <SliderBox  images={Images}  sliderBoxHeight={300} circleLoop parentWidth={200}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                /> */}
                  <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={300}
                itemWidth={screenWidth}
                data={Images}
                renderItem={renderItem}
                hasParallaxImages={true}
               />
               <Text style={{fontSize:24,fontWeight:'900',color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium',margin:5,letterSpacing:1}}> {HotelName.toUpperCase()} </Text>
              <Text style={{fontWeight:'400',color:dColor,margin:8,letterSpacing:1,}}>{Address} </Text>

              <View style={{margin:8,height:0.5,backgroundColor: '#ddd',}}/>

             <Text style={{fontWeight:'400',color:darktext,fontSize:18,margin:8,letterSpacing:1}}>AMENITIES </Text>

                <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                {HotelFacilities.map((item,id)=>
                    <View style={{flexDirection:'row',minWidth:screenWidth/2,height:34}}>
                        <View style={{height:8,width:8,backgroundColor:darktext,alignSelf:'center',marginLeft:16,borderRadius:4}}/>
                        <Text style={{alignSelf:'center',color:darktext,fontWeight:'500',}}>  {item} </Text>
                    </View>
                    )}
                </View>

            <View style={{margin:8,height:0.5,backgroundColor: '#ddd',}}/>



            <Text style={{fontWeight:'400',color:darktext,fontSize:18,margin:8,letterSpacing:1}}>ABOUT THE HOTEL </Text>

            <HTML html={"<div style='letter-spacing:0.8'>"+ Description + '</div>'} containerStyle={{padding:8,letterSpacing:1}} imagesMaxWidth={Dimensions.get('window').width} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      width: screenWidth,
      height: 300,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
  })