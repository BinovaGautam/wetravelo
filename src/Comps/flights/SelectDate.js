import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Dimensions,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {strings,Loader} from '../assets' 
import { Icon } from 'native-base';

let {dColor,lightGreen} = strings
let {height,width} = Dimensions.get('screen')

export default class SelectDate extends Component {
  static navigationOptions = ({navigation}) =>{
    return{
      title:`${navigation.getParam('mode','SELECT DATE')}`
    }
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
    navigation.goBack()
    }
 
  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2020, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
 
    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={minDate}
          maxDate={maxDate}
          selectedStartDate={minDate}
          todayBackgroundColor={lightGreen}
          selectedDayColor={dColor}
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
          previousTitle = {<Icon name="arrow-left-bold-circle-outline" type="MaterialCommunityIcons" style={{alignSelf:'center'}} />}
          nextTitle = {<Icon name="arrow-right-bold-circle-outline" type="MaterialCommunityIcons" style={{alignSelf:'center'}} />}
          scaleFactor={350} 
        />
 
        {/* <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View> */}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
});