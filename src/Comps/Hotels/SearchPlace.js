import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firestore from '@react-native-firebase/firestore'
import LottieView from 'lottie-react-native';
import { Icon } from 'native-base';
import {connect} from 'react-redux'
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 

let db =firestore()
 class SearchPlace extends Component {
    static navigationOptions = ({navigation}) => ({
        // headerLeft: <TouchableOpacity style={{justifyContent:'center',height:48,width:48,borderRadius:24}} activeOpacity={0.6}>
        //                     <Icon name="arrowleft" type='AntDesign' style={{textAlign:'center'}} onPress={()=>navigation.navigate('Home')} />
        //             </TouchableOpacity>,
        headerStyle:{
            elevation:0,
            marginTop:24
        }            
    })

   constructor(props){
       super(props)
       this.state = {}
   }

   componentDidMount() {
       let {navigation} = this.props
    //    navigation.navigate('SelectDateRange')
   }
   
   select = (data,details,navigation) => { 
    let action = navigation.getParam('action',false)
    if(action) action(details)
    this.props.setStore({details})
    navigation.goBack()
  
    }
   
    render() {
        let {navigation} = this.props
        let {loading}  = this.state
        
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
               <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#fff"/> 
                 <GooglePlacesAutocomplete
                    placeholder='Search Area/Location/City'
                    minLength={2} // minimum length of text to search
                    // autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => this.select(data,details,navigation) }
                    
                    getDefaultValue={() => ''}
                    
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCXGC9JYVtpsp5U88rj0MrwKT5QrrdxqV0',
                        language: 'en', // language of the results
                        //  types : '(regions)' // default: 'geocode'
                    }}
                    
                    styles={{
                        textInputContainer: {height:70,backgroundColor:'#fff',borderColor:'transparent',elevation:3,borderTopWidth:0,alignItems:'center'},
                        description: {
                        fontWeight: 'bold'
                        },
                        textInput:{fontSize:24,fontWeight:'600',height:60},
                        predefinedPlacesDescription: {
                        color: '#FFF'
                        }
                    }}
                    
                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food'
                    }}
                
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    // predefinedPlaces={[homePlace, workPlace]}
                
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    // renderRightButton={() => <Text>Custom text after the input</Text>}
                />

                {loading ? <LottieView source={require('../assets/lottie/3711-santa-stop-here.json')} autoPlay loop />: null}
            </View>
            
        )
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      setStore : (data) => dispatch({type:'ALTER_HOTEL',payload : {...data}}),
    }
}

export default connect(null,mapDispatchToProps)(SearchPlace)