import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Dimensions,StatusBar,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {strings,Loader} from '../assets' 
import { Icon } from 'native-base';
import DatepickerRange from 'react-native-scrollable-datepicker';
import LottieView from 'lottie-react-native';

let {dColor,lightGreen} = strings
let {height,width} = Dimensions.get('screen')

export default class SelectDateRange extends Component {
  static navigationOptions = {
  //  header : null
    
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    
  }
  

  componentDidMount() {
    setInterval(() => {
    this.setState({load:true})
    }, 50);
  }
 
  
 
 

    onSubmit = (CheckInDate,CheckOutDate) =>{
      let {navigation} = this.props
      let navparams =  navigation.state.params || {}
      let {getDay} = navparams
      if(CheckInDate && CheckOutDate && getDay){
        let NoOfNights = CheckOutDate.diff(CheckInDate,'days')
        getDay(CheckInDate,CheckOutDate,NoOfNights)
        
      }
      navigation.goBack()
    }
 
  render() {
    const { selectedStartDate, selectedEndDate,load } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2020, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
 
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
      
 
       {load ?
        <DatepickerRange 
            buttonColor = {dColor} selectedBackgroundColor={dColor} buttonContainerStyle= {{backgroundColor:dColor,elevation:5}}
            onConfirm= {( startDate, untilDate ) =>this.onSubmit(startDate,untilDate)} showClose={false}
        />
        :
        <LottieView source={require('../assets/lottie/calendar.json')} autoPlay loop />
      }
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});