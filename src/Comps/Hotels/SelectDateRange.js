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

let {dColor,lightGreen} = strings
let {height,width} = Dimensions.get('screen')

export default class SelectDateRange extends Component {
  static navigationOptions = {
   header : null
    
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

 
  
 
  onDateChange(date, type) {
    const {navigation} = this.props
    let sday = new Date(date)
    let dateString = `${sday.getDate()}-${sday.getMonth()+1}-${sday.getFullYear()}T00:00:00`
    let getDay = navigation.getParam('getDay',null)
    let dayType = navigation.getParam('dayType','departure')
    if(getDay) getDay(sday,dateString,dayType)
    navigation.navigate('SelectGuests',{name:'binova'})
    }

    onSubmit = (CheckInDate,untilDate) =>{
      let {navigation} = this.props
      let navparams =  navigation.state.params || {}
      let {citydetails,address} = navparams
      if(CheckInDate && untilDate) navigation.navigate('SelectGuests',{CheckInDate,citydetails,address,NoOfNights:2})
    }
 
  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2020, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
 
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
      
 
    <DatepickerRange 
        buttonColor = {dColor} selectedBackgroundColor={dColor} buttonContainerStyle= {{backgroundColor:dColor,elevation:5}}
        onConfirm= {( startDate, untilDate ) =>this.onSubmit(startDate,untilDate)} showClose={false}
    />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
  },
});