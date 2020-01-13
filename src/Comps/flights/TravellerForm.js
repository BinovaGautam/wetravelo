import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform} from 'react-native'
import { Icon, Form, Item, Input, Label ,DatePicker,CheckBox} from 'native-base';
import {strings} from '../assets'
import Snackbar from 'react-native-snackbar';
import moment from 'moment'
import {connect} from 'react-redux'
// import HTML from 'react-native-render-html';
import firestore from '@react-native-firebase/firestore'
import { uuid } from 'uuidv4';

let {dColor,darktext,lightTeal,pink} = strings
 class TravellerForm extends Component {
    static navigationOptions = { 
        // title:'Add Traveller'
    }

    constructor(props){
        super(props)
        this.state ={gender:'MALE',mode:'Add',FirstName:'',LastName:'',Title:'Mr',save:true}
    }
    componentDidMount() {
        let {navigation} = this.props
        this.props.navigation.setParams({getCountry: this.getCountry})
        let edit = navigation.getParam('edit',null)
        if(edit) this.setState({...edit.item,mode:'Edit',index:edit.index,edit:true})
         
        let title = navigation.getParam('alt','Adult')
        let mindate,maxDate
         switch(title){
                            case 'Adult':
                                 mindate =  new Date(1900,1,1);
                                 maxDate =  new Date(moment().subtract(12,'years'))
                                 break;
                            case 'Child':
                                mindate = new Date(moment().subtract(12,'years'))
                                maxDate = new Date(moment().subtract(2,'years'))
                                break;
                            case 'Infant':
                                mindate = new Date(moment().subtract(2,'years'))
                                maxDate = new Date()
                                break;
                      }
        
        this.setState({title,mindate,maxDate})

       
                      
    }

    getCountry = country =>{
        let {nationality,alpha_2_code,en_short_name} = country
        let CountryCode = alpha_2_code
        let CountryName = en_short_name
        // alert(CountryName)
        this.setState({CountryCode,CountryName,nationality:nationality.toUpperCase()})
    }
    
    setDate = date => {
         
         let  DateOfBirth = moment(date).format("YYYY-MM-DD")
        //  alert(DateOfBirth)
        //  let  DateOfBirth = `${sday.getFullYear()}-${sday.getMonth()+1}-${sday.getDate()}`
        //  alert(DateOfBirth.toISOString().substr(0,10))
        this.setState({DateOfBirth,date})
    }
    submit = () =>{
        this.setState({submit:true})
        // alert(JSON.stringify(this.state))
        let {FirstName,LastName,DateOfBirth,CountryName,CountryCode,gender,nationality,date,index,Title,mode,save,title} = this.state
        let {auth} = this.props
        let {uid} = auth.user
        if(FirstName && LastName && DateOfBirth && nationality && gender){
            let {navigation} = this.props
            let list = navigation.getParam('list',[])
            let id = navigation.getParam('id',0)
            let getList = navigation.getParam('getList',null)
            let listId = this.state.listId ||  uuid() 

            let obj = {FirstName,LastName,DateOfBirth,CountryCode,CountryName,date, Gender: gender === 'MALE' ? 1 : 2,PaxType:id+1,Title,listId, nationality}
            index != null ? list[index] = obj :list.push(obj)
            
            if(save && uid){
                
                firestore().collection('users').doc(uid).collection('MasterList').doc(listId).set(obj)
            }
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
        let {FirstName,LastName,DateOfBirth,gender,nationality,submit,index,mode,date,title,mindate,maxDate,Title,save,edit} = this.state
        let {navigation} = this.props
        
        let ios = Platform.OS === 'ios' ? true : false
        let travellers = [
                        {title:'Adults',name:'AdultCount',value : 1,description:'Ages Above 12 Years'},
                        {title:'Children',name:'ChildCount',value : 0,description:'Ages 2 - 12 Years'},
                        {title:'Infants',name:'InfantCount',value : 0,description:'Under 2 Years'},
                    ]

        
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
                <ScrollView style={{flex:1}}>
                   
                      <View  style={{borderBottomWidth:0,borderColor:'#f5f5f5',padding:15}}>
                         
                          <Text style={[{fontSize:36,fontWeight:'600',color:darktext,fontFamily:ios?'Optima':'sans-serif-medium'} ]}>{mode} {title}</Text>

                                    <View style={{padding:10,marginTop:15,borderColor:'#ddd',borderRadius:5}}>
                                        <Text style={{fontSize:18,fontWeight:'500',color:darktext,letterSpacing:1,marginHorizontal:10}}>Title</Text>
                                                <View style={{flexDirection:'row',margin:15,marginTop:20,borderWidth:2,height:30,borderColor:lightTeal}}>
                                                    
                                                            {['Mr','Miss','Mrs','Mstr'].map((item,id)=>
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
                                            <Label style={{color:submit && !FirstName ? pink : dColor}}>First Name</Label>
                                            <Input autoCapitalize="words" value={FirstName || ''} autoFocus={true} onChangeText={name =>{this.setState({FirstName:name})}} />
                                            
                                                
                                            </Item>
                                            <Item floatingLabel>
                                            <Label style={{color:submit && !LastName ? pink : dColor}}>Last Name</Label>
                                            <Input autoCapitalize="words" value={LastName || ''} onChangeText={name =>{this.setState({LastName:name})}} />
                                            </Item>

                                            <View style={{flexDirection:'row',margin:15,marginTop:20,borderWidth:2,height:40,borderColor:lightTeal}}>
                                                {['MALE','FEMALE'].map((item,id)=>
                                                    <TouchableOpacity key={id} activeOpacity={0.8} onPress={()=>this.setState({gender:item})}
                                                    style={{flex:1,justifyContent:'center',backgroundColor:gender != item ? '#fff' : lightTeal}}>
                                                        <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color: gender == item ? '#fff' : lightTeal }}>
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    )}

                                                
                                            </View>


                                            <TouchableOpacity activeOpacity={0.8}
                                             style={{justifyContent:'center',marginTop:20,borderColor:submit && !DateOfBirth ? pink : lightTeal,margin:15,alignItems:'center',borderRadius:5,borderWidth:2}}>
                                            <DatePicker
                                            defaultDate={new Date()}
                                            minimumDate={mindate}
                                            maximumDate={maxDate}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText={DateOfBirth ? DateOfBirth :"DATE OF BIRTH"}
                                            textStyle={{ color: lightTeal ,fontSize:18,fontWeight:'500'}}
                                            placeHolderTextStyle={{ color:submit && !DateOfBirth ? pink : lightTeal,fontSize:18,fontWeight:'500' }}
                                            onDateChange={this.setDate}
                                            disabled={false}
                                            />
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SelectCountry',{getCountry: this.getCountry})}
                                             style={{justifyContent:'center',marginTop:20,borderColor:submit && !nationality ? pink : lightTeal,margin:15,alignItems:'center',borderRadius:5,borderWidth:2}}>
                                                 <Text style={{ color:submit && !nationality ? pink : lightTeal,fontSize:18,fontWeight:'500',textAlign:'center',marginVertical:10 }}>
                                                     {nationality || 'NATIONALITY'}
                                                 </Text>
                                           
                                            </TouchableOpacity>
                                        </Form>
                                         

                                    </View>
                                
                           
                      </View>
                     
                        
                        

                      
                </ScrollView>
                <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>

                    <View style={{flex:1,justifyContent:'center',flexDirection:'row',alignContent:'center',alignSelf:'center'}}>
                        <CheckBox onPress={() => this.setState({save: !save})} color={lightTeal} checked={save} style={{marginHorizontal:8}} />
                        <Text style={{color:dColor,fontWeight:'500',letterSpacing:1,marginHorizontal:8}}>{edit ?'Update Master List' : 'Save To Master List'}</Text>
                    </View>
                   
                    <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginLeft:14,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18}}>DONE</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(TravellerForm)