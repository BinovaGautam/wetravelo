import MainScreen from './MainScreen'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import React, { Component } from 'react'
import { Text, View,StatusBar } from 'react-native'
import { strings ,Loader } from '../../assets'
import Baggage from './Baggage'
import {connect} from 'react-redux'

const ExtraServices = require('../DummyData/ExtraServices.json')
const ExtraServiceDetails = ExtraServices.ExtraServices.ExtraServiceDetails


let {dColor,lightTeal,pink,silver} = strings
const Nav = createMaterialTopTabNavigator({
    Baggage : Baggage,
    Meals : MainScreen,
    Seat : MainScreen,

},{
    tabBarOptions : {
        activeTintColor : pink,
        inactiveTintColor:lightTeal,
        indicatorStyle:{
            backgroundColor: pink
        },
        labelStyle : {
            fontWeight:'700'
        },
        style : {
            backgroundColor: '#fff',
        }
    }
})


const NavComponent = createAppContainer(Nav)


class ServicesNav extends Component {
    constructor(props){
        super(props)
        let {flight} = props
        
    }

    componentDidMount() {
        // console.warn(ExtraServiceDetails)
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <View style={{height:60,backgroundColor: silver,}}>
                    
                </View>
                <NavComponent screenProps={ExtraServiceDetails} />
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        flight: state.flight
    }
}

export default  connect(mapStateToProps)(ServicesNav)