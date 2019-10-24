import React, { Component } from 'react'
import { Text, View ,StatusBar,Image,Dimensions,TouchableOpacity,ScrollView,Platform} from 'react-native'
import { Icon, Form, Item, Input, Label ,DatePicker} from 'native-base';
import {strings} from '../assets'
import Snackbar from 'react-native-snackbar';
// import HTML from 'react-native-render-html';


let {dColor,darktext,lightTeal,pink} = strings
export default class TravellerForm extends Component {
    static navigationOptions = { 
        title:'Add Traveller'
    }

    constructor(props){
        super(props)
        this.state ={gender:'MALE',mode:'Add',FirstName:'',LastName:'',}
    }
    componentDidMount() {
        let {navigation} = this.props
        this.props.navigation.setParams({getCountry: this.getCountry})
        let edit = navigation.getParam('edit',null)
        if(edit) this.setState({...edit.item,mode:'Edit',index:edit.index})
       
    }

    getCountry = country =>{
        let {nationality,alpha_2_code,en_short_name} = country
        let CountryCode = alpha_2_code
        let CountryName = en_short_name
        // alert(CountryName)
        this.setState({CountryCode,CountryName,nationality:nationality.toUpperCase()})
    }
    
    setDate = date => {
         let sday = new Date(date)
         DateOfBirth = `${sday.getDate()}-${sday.getMonth()+1}-${sday.getFullYear()}`
        //  alert(DateOfBirth.toISOString().substr(0,10))
        this.setState({DateOfBirth,date})
    }
    submit = () =>{
        this.setState({submit:true})
        alert(JSON.stringify(this.state))
        let {FirstName,LastName,DateOfBirth,CountryName,CountryCode,gender,nationality,date,index} = this.state
        if(FirstName && LastName && DateOfBirth && nationality && gender){
            let {navigation} = this.props
            let list = navigation.getParam('list',[])
            let id = navigation.getParam('id',0)
            let getList = navigation.getParam('getList',null)
        
            let obj = {FirstName,LastName,DateOfBirth,CountryCode,CountryName,date, Gender: gender === 'MALE' ? 1 : 2,PaxType:id+1}
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
        let {FirstName,LastName,DateOfBirth,gender,nationality,submit,index,mode,date} = this.state
        let {navigation} = this.props
        let title = navigation.getParam('title','Adult')
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
                                            defaultDate={new Date(2018, 4, 4)}
                                            minimumDate={new Date(1900, 1, 1)}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText={date ? (new Date(date)).toLocaleDateString() :"DATE OF BIRTH"}
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
                   
                    <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18}}>DONE</Text>
                    </TouchableOpacity>
                </View>
                
               
            </View>
        )
    }
}


