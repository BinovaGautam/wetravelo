import React, { Component } from 'react';
import { View, Text ,StyleSheet,Dimensions } from 'react-native';
import {Spinner} from 'native-base'
import strings from '../assets/strings'

const color = strings.color

const {height,width} = Dimensions.get('window')
export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const data = this.props
      const custom = {top:data.top || height/2}
    return (
      <View style={[styles.container,custom]}>
         <Spinner color={color} style={{textAlign:'center'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {height:40,width:40,borderRadius: 20,top:height/2,alignSelf: 'center',justifyContent: 'center',
        backgroundColor: '#fff',elevation:6,position:'absolute' }
})