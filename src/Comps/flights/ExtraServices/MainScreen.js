import React, { Component } from 'react'
import { Text, View,StatusBar,ScrollView } from 'react-native'

export default class MainScreen extends Component {
   
    constructor(props){
        super(props)
        this.state = {}
    }


    render() {
        return (
            <View>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
