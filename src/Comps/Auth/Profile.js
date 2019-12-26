import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity,TextInput,ScrollView} from 'react-native'
import {strings, Loader} from '../assets'
import auth from '@react-native-firebase/auth'

import { Icon} from 'native-base';

let {dColor,darktext,lightTeal,pink,silver} = strings
const ios = Platform.OS === 'ios' ? true : false

 class Profile extends Component {
    constructor(props){
        super(props)
        this.state={submit: false}
    }
    
    
  
    render() {
        let {submit,email,password,loading} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor: "#fff",}}>
                <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:10,letterSpacing:1.5} ]}>Notifications</Text>
                 {loading ? <Loader /> : null}
               <ScrollView style={{flex:1}}>
                  <View style={{marginHorizontal:10,backgroundColor: '#f5f5f5',}}>
                      <Text style={{textAlign:'right',margin:10,color:lightTeal}}> 26 Nov</Text>
                  <Text style={{margin:10,fontWeight:'500',color:darktext,letterSpacing:1,fontSize:16}}>
                                        Thank you for signing Up, You have got ₹500 as signing up bonus. Go to the Wallet inorder to see the balance.
                                        </Text>
                  </View>
               </ScrollView>
                                

            </View>
        )
    }
}

export default Profile