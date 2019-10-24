import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions } from 'react-native';
import strings from './strings'

const {height,width} = Dimensions.get('screen')
const color = strings.color
export default class Popup extends Component {
   constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{height:height,width:width,backgroundColor: '#fff',position:'absolute',top:0,left:0,padding:10}}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    popup : {height: 200 ,width:200,position:'absolute',top:100,left:25,elevation:6,padding:10,backgroundColor: '#fff',}
})