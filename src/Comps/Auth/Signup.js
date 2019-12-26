import React, { Component } from 'react'
import { Text, View,StatusBar,Platform,TouchableOpacity,TextInput,ScrollView} from 'react-native'
import {strings, Loader} from '../assets'
import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'
import { Icon, Form, Item, Input, Label ,DatePicker} from 'native-base';

let {dColor,darktext,lightTeal,pink,silver} = strings
const ios = Platform.OS === 'ios' ? true : false

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state={submit: false}
    }
    createUser = () =>{
        let {email,password} = this.state
        if(email && password){
            let credential = auth.EmailAuthProvider.credential(email, password);
            this.setState({loading:true})
            auth().currentUser.linkWithCredential(credential)
            .then(res => {
                this.setState({loading:false})
                this.props.navigation.navigate('Account')
            })
            .catch(err => {
                console.warn(err)
                this.setState({loading:false})
        })
        }
       
    }
    render() {
        let {submit,email,password,loading} = this.state
        let {navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor: "#fff",}}>
                <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',margin:10,letterSpacing:1.5} ]}>New Account</Text>
                 {loading ? <Loader/> : null}
               <ScrollView style={{flex:1}}>
                    <View style={{padding:10,marginTop:15,borderColor:'#ddd',borderRadius:5}}>
                                    <View>
                                        <Text style={{fontWeight:'500',letterSpacing:1,fontSize:18,margin:8,color:darktext}}>Email Address</Text>
                                        <TextInput  autoCompleteType="email" textContentType="emailAddress" value={email || ''} autoFocus={false} onChangeText={name =>{this.setState({email:name})}}
                                        style={{height:50,backgroundColor:'#fff',borderWidth:1,borderColor:lightTeal,margin:10,borderRadius:5,padding:8}} underlineColorAndroid='transparent'  />
                                            
                                    </View>

                                    <View>
                                        <Text style={{fontWeight:'500',letterSpacing:1,fontSize:18,margin:8,color:darktext}}>Password</Text>
                                        <TextInput secureTextEntry={true}  autoCompleteType="password" textContentType="password" value={password || ''} autoFocus={false} onChangeText={name =>{this.setState({password:name})}}
                                        style={{height:50,backgroundColor:'#fff',borderWidth:1,borderColor:lightTeal,margin:10,borderRadius:5,padding:8}} underlineColorAndroid='transparent'  />
                                                    
                                    </View>
                                                
                                        

                                            
                                            
                                <TouchableOpacity onPress={this.createUser} style={{height:50,borderRadius:5,backgroundColor:dColor,justifyContent:"center",margin:10,marginTop:18}} activeOpacity={0.8}>
                                    <Text style={{textAlign:'center',fontSize:18,letterSpacing:1,color:'#fff',fontWeight:'500'}}>CREATE ACCOUNT</Text>
                                </TouchableOpacity> 

                                    <TouchableOpacity style={{height:50,borderRadius:5,borderColor:dColor,borderWidth:1,justifyContent:"center",margin:10,marginTop:18,flexDirection:'row'}} activeOpacity={0.8}>
                                        <Icon name="logo-google" style={{color:dColor,marginLeft:20,alignSelf:'center'}} />
                                    <Text style={{textAlign:'center',fontSize:18,letterSpacing:1,color:dColor,fontWeight:'500',flex:1,alignSelf:'center',marginLeft:-20}}>Continue With Google</Text>
                                </TouchableOpacity>  


                                {/* <View style={{margin:10,height:1,backgroundColor: dColor,marginTop:18}}/>      */}

                                    <View>
                                        <Text style={{fontWeight:'500',letterSpacing:1,fontSize:18,margin:8,color:darktext}}>Have An Account ?</Text>
                                        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}
                                         style={{height:50,borderRadius:5,backgroundColor:lightTeal,justifyContent:"center",margin:10,marginTop:18}} activeOpacity={0.8}>
                                            <Text style={{textAlign:'center',fontSize:18,letterSpacing:1,color:'#fff',fontWeight:'500'}}>LOGIN</Text>
                                        </TouchableOpacity>   
                                    </View>       
                    

                                </View>


               </ScrollView>
                                

            </View>
        )

       
    }

    login = () =>{
        let {navigation} = this.props
        navigation.navigate('SignIn')
    }
}
