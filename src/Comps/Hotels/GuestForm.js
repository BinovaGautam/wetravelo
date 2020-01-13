import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform} from 'react-native'
import { Icon, Form, Item, Input, Label ,DatePicker} from 'native-base';
import {strings} from '../assets'
import Snackbar from 'react-native-snackbar';
// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal,pink} = strings
export default class GuestForm extends Component {
    static navigationOptions = { 
        // title:'Add Guest'
    }

    constructor(props){
        super(props)
        this.state ={Title:'Mr',mode:'Add',FirstName:'',LastName:'',LeadPassenger:false,}
    }
    componentDidMount() {
        let {navigation} = this.props
        let edit = navigation.getParam('edit',null)
        if(edit) this.setState({...edit.item,mode:'Edit',index:edit.index})
       
    }

  
  
    submit = () =>{
        this.setState({submit:true})
        // alert(JSON.stringify(this.state))
        let {FirstName,MiddleName, LastName,Age,index,Title} = this.state
        if(FirstName && LastName && Age  && Title){
            let {navigation} = this.props
            let navparams =  navigation.state.params || {}
            let {list,id,getList,length} = navparams
            let bool = id + length
        
            let obj = {FirstName,LastName,Age, Title,PaxType:id+1,Phoneno:9582852710,Email:'binova1245@gmail.com',LeadPassenger: !bool}
            index != null ? list[index] = obj :list.push(obj)
        
            if(getList) getList(list,id)
            navigation.goBack()
        }else{
            Snackbar.show({
                title: 'All Fields Are Mandetory.',
                duration: Snackbar.LENGTH_SHORT
            })
        }
        
        // alert(JSON.stringify(this.state))
    }

    render() {
        let {FirstName,LastName,Title,Phoneno,PaxType,LeadPassenger,index,mode,Age,MiddleName,submit,Email} = this.state
        let {navigation} = this.props
        let title = navigation.getParam('title','Adult')
        let ios = Platform.OS === 'ios' ? true : false
       
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                   
                      <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                         
                          <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium',letterSpacing:1} ]}>{mode} {title}</Text>

                                    <View style={{padding:10,marginTop:15,borderColor:'#ddd',borderRadius:5}}>
                                        
                                    <Text style={{fontSize:18,fontWeight:'500',color:darktext,letterSpacing:1,marginHorizontal:10}}>Title</Text>
                                    <View style={{flexDirection:'row',margin:15,marginTop:20,borderWidth:2,height:30,borderColor:lightTeal}}>
                                          
                                                {['Mr','Mrs','Mstr'].map((item,id)=>
                                                    <TouchableOpacity key={id} activeOpacity={0.8} onPress={()=>this.setState({Title:item})}
                                                    style={{flex:1,justifyContent:'center',backgroundColor:Title != item ? '#fff' : lightTeal,borderLeftWidth: id ? 2 : 0,borderColor:lightTeal}}>
                                                        <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color: Title == item ? '#fff' : lightTeal }}>
                                                            {item.toUpperCase()}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    )}

                                                
                                            </View>


                                        
                                        <Form>
                                          
                                            
                                            <Item floatingLabel>
                                            <Label style={{color:submit && !FirstName ? pink : dColor,marginHorizontal:10}}>First Name</Label>
                                            <Input autoCapitalize="words" value={FirstName || ''} autoFocus={false} onChangeText={name =>{this.setState({FirstName:name})}} />
                                            
                                            </Item>

                                            <Item floatingLabel>
                                            <Label style={{color: dColor,marginHorizontal:10}}>Middle Name</Label>
                                            <Input autoCapitalize="words" value={MiddleName || ''}  onChangeText={name =>{this.setState({MiddleName:name})}} />
                                            
                                            </Item>

                                            <Item floatingLabel>
                                            <Label style={{color:submit && !LastName ? pink : dColor,marginHorizontal:10}}>Last Name</Label>
                                            <Input autoCapitalize="words" value={LastName || ''} onChangeText={name =>{this.setState({LastName:name})}} />
                                            </Item>

                                            <Item floatingLabel>
                                            <Label style={{color:submit && !Age ? pink : dColor,marginHorizontal:10}}>Age</Label>
                                            <Input  keyboardType='numeric'  value={Age || ''} onChangeText={name =>{this.setState({Age:name})}} />
                                            </Item>

                                           {LeadPassenger ?
                                            <View>
                                                   <Item floatingLabel>
                                                    <Label style={{color:submit && !Phoneno ? pink : dColor,marginHorizontal:10}}>Phone No</Label>
                                                    <Input  keyboardType='numeric'  value={Phoneno || ''} onChangeText={name =>{this.setState({Phoneno:name})}} />
                                                    </Item>

                                                    <Item floatingLabel>
                                                    <Label style={{color:submit && !Email ? pink : dColor,marginHorizontal:10}}>Email Address</Label>
                                                    <Input   value={Email || ''} onChangeText={name =>{this.setState({Email:name})}} />
                                                    </Item>
                                            </View>
                                            
                                            :null}
                                         
                                        </Form>
                                         

                                    </View>
                                
                           
                      </View>
                     
                        
                        

                      
                </ScrollView>
                <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                   
                    <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18}}>DONE</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}


