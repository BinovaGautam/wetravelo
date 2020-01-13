import React, { Component } from 'react'
import { Text, View,StatusBar,TouchableOpacity,ScrollView,Platform} from 'react-native'
import { Loader,strings } from '../assets'
import moment from 'moment'
import { CheckBox } from 'native-base'
import Snackbar from 'react-native-snackbar'

let {darktext,dColor,pink,grey,lightTeal,silver} = strings

export default class MasterList extends Component {
    static navigationOptions = {
        header : null
    }

    constructor(props){
        super(props)
        this.state = {}
    }

    select = (id,diffId) => {
        let {travellers,MasterList} = this.state
        let  item =   MasterList[id] 
        // console.warn(item)
        let {checked} =   item
        let {list,value,alt,} = travellers[diffId]
        
            // console.warn(travellers[diffId])
        if(checked){
            list.splice(item.posId,1)
             item.posId = null
             item.checked = !checked
        }else{
                if(value - list.length > 0){
                    item.posId = list.length
                    list.push(MasterList[id]) 
                    item.checked = !checked   
                }else{
                    let msg = value ? `You already added ${value}/${value} ${alt}` : `You cannot add ${alt}`
                    Snackbar.show({
                        title:`${msg}`,
                        duration:Snackbar.LENGTH_SHORT
                    })
                }
            
            }

            let space = value - list.length // this indicates the space available of a certain kind

            travellers[diffId].disabled = !space  //particular type of user visible or not
            MasterList[id] = item
            travellers[diffId].list = list
            
            this.setState({travellers,MasterList})
        }

    submit = () => {
        let {travellers,MasterList} = this.state
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        
        let {getFromList} = navparams
        if(getFromList) getFromList({travellers,MasterList})
        navigation.goBack()

    }

    componentDidMount() {
        let {navigation} = this.props
        let navparams =  navigation.state.params || {}
        
        let {travellers,MasterList} = navparams

        this.setState({MasterList,travellers,ready : true})
    }
    render() {
        let {ready,MasterList,travellers} = this.state
        let ios = Platform.OS === 'ios' ? true : false
        return (
            <View style={{flex:1,backgroundColor: '#fff',marginTop:40}} >
                <StatusBar translucent={true} backgroundColor='#fff' barStyle="dark-content"/>
                {ready ?

                <View style={{flex:1}}>
                  <ScrollView style={{flex:1}}>
                    <Text style={[{fontSize:32,fontWeight:'600',margin:10,color:darktext,fontFamily:ios?'Palatino-Bold':'sans-serif-medium'} ]}>Master List</Text>
                      {MasterList.map((item,id) => {
                          let {FirstName,LastName,gender,Title,date,DateOfBirth,type,checked} = item
                          let diff = moment().diff(moment(DateOfBirth),'years')
                          let diffId = diff < 2 ? 2 : diff < 12 ? 1 : 0
                          let ageType = diff < 2 ? 'INFAT' : diff < 12 ? 'CHILD' : 'ADULT'
                          let disabled = travellers[diffId].disabled
                          return(
                              <View key={id} style={{padding:8,borderBottomWidth:0.8,borderColor:grey,flexDirection:'row',height:60,alignContent:'center',opacity:checked? 1 : disabled ? 0.7 : 1}}>
                                  <CheckBox disabled={checked ? false : disabled} color={lightTeal} checked={checked} onPress ={() => this.select(id,diffId)} style={{alignSelf:'center'}} />
                                  <Text style={{alignSelf:'center',fontWeight:'700',color:darktext,letterSpacing:1,marginHorizontal:8,flex:1,marginLeft:15}}>{Title} {FirstName} {LastName} </Text> 

                                  <View style={{padding:3,borderWidth:1,borderRadius: 4,borderColor: lightTeal ,backgroundColor: silver,alignSelf: 'center',justifyContent: 'center',}}>
                                      <Text style={{textAlign:'center',fontWeight:'500',fontSize:12,color:darktext,marginHorizontal:8}}>{ageType}</Text>
                                  </View>
                              </View> 
                          )
                      })

                      }
                  </ScrollView>
                
                  <View style={{height:80,justifyContent:'center',padding:8,borderTopWidth:0.5,borderColor:'#ddd',flexDirection:'row'}}>
                   
                    <TouchableOpacity  activeOpacity={0.8} onPress={this.submit}
                    style={{borderRadius:4,flex:1, justifyContent:'center',backgroundColor:dColor,marginHorizontal:10,marginBottom:10}}>
                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'500',fontSize:18,letterSpacing:1}}>DONE</Text>
                    </TouchableOpacity>
                </View>
                
               
             </View>
               
                : <Loader/> }
               
            </View>
        )
    }
}
