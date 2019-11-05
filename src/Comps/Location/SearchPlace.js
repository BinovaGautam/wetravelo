import React, { Component } from 'react'
import { Text, View,StatusBar } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from '@react-native-firebase/app'
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 

let db = firebase.firestore()
export default class SearchPlace extends Component {

    componentDidMount() {
        // firestore().collection('test').set({name:'Ammmarwaaa'})
    }
    
    render() {
        return (
            <View style={{flex:1,marginTop:50}}>
               <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#fff"/> 
                 <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    // autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        alert(JSON.stringify(details.address_components))
                        let {address_components} = details
                        for (var i = 0; i < address_components.length; i++) {
                            let addressType = address_components[i].types[0];
                            // for the country, get the country code (the "short name") also
                            if (addressType == "locality") {
                              let city = address_components[i].long_name;
                            }
                          }
                    }}
                    
                    getDefaultValue={() => ''}
                    
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCXGC9JYVtpsp5U88rj0MrwKT5QrrdxqV0',
                        language: 'en', // language of the results
                        //  types : '(regions)' // default: 'geocode'
                    }}
                    
                    styles={{
                        textInputContainer: {
                        width: '100%',
                        height: 70,justifyContent: 'center',elevation:3,borderColor:'transparent',
                        backgroundColor: '#fff'
                        },
                        description: {
                        fontWeight: 'bold'
                        },
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
            </View>
        )
    }
}
