import React, { Component,PureComponent } from 'react'
import { Text, View,ScrollView,TouchableOpacity,FlatList } from 'react-native'
import { Icon } from 'native-base'
import {strings} from '../assets'
import SplitCard from './SplitCard'

let {dColor,darktext,silver,lightTeal,INR,eblue} = strings
export default class SplitView extends Component {
    constructor(props){
        super(props)
        this.state={selected : null,selection:[null,null]}
    }

    onSelect = (id,data) =>{
        let {selected,selection} =  this.state
         selection[id] = data
        //  let filteredSelection = selected ? [1,1] : selection.filter(item => item != null) //check if both items are selected or not
         let total = selection[0] && selection[1] ? selection.reduce((a,b) =>  parseInt(a.Price.TotalDisplayFare) + parseInt(b.Price.TotalDisplayFare)) : null
         this.setState({selection,selected : true,total })
    }

    sort = () =>{
        let {selection} = this.state
        alert(JSON.stringify(selection))
    }


    submit = () =>{
        let {selected,selection,total} = this.state
        let {navigation} = this.props
        if(selected && total && selection.length == 2) navigation.navigate('ReturnDetails',{data:{selection,total}})
    }
    
    render() {
        
        const {navigation,JourneyList} = this.props
        let {sort,selected,selection,total} = this.state
        return (
            <View style={{flex:1}}>
            {/* a header that implies the combination selected  */}
           
            <View style={{flexDirection:'row',backgroundColor: silver,flex:1}}>
                
                {
                    //map through the journey list and make part in the screens max 2parts
                    JourneyList.map((Jlist,id) =>{ 
                        sort ? Jlist.sort((a,b) =>  a.Price.TotalDisplayFare - b.Price.TotalDisplayFare) : null
                        
                   return  (
                             
                //    <ScrollView key={id} style={{flex:1,marginLeft:id?2:0}}>
                         
                        <SplitScreen selected={selected} selection={selection[id]} onSelect={this.onSelect} index={id} Jlist={Jlist} />
                    //  </ScrollView>
                     )
                    })
                   
                }
            </View>
            {/* <TouchableOpacity onPress={this.sort}  style={{height:60,justifyContent:'center'}}>
                <Text style={{textAlign:'center'}}>Sort </Text>
            </TouchableOpacity> */}

            <View style={{height:60,flexDirection:'row',justifyContent:'space-around',borderTopWidth:1,borderColor:"#ddd",}}>
                {selection.map((item,id) =>
                    (<View key={id} style={{flex:2,justifyContent:'center',margin:5}}>
                       <Text style={{fontSize:10,color:lightTeal,textAlign:'center',fontWeight:'500'}}> {id ? 'RETURN': 'DEPART'} </Text>
                       <Text style={{fontSize:18,color:darktext,textAlign:'center',fontWeight:'700'}}> {item ?INR + item.Price.TotalDisplayFare : ''} </Text>
                    </View>)
                )}
                <View  style={{flex:3,justifyContent:'center',alignSelf:'center'}}>
                       <Text style={{fontSize:18,color:dColor,textAlign:'center',fontWeight:'700',letterSpacing:1}}> {INR + total} </Text>
                    </View>
                <TouchableOpacity onPress={this.submit}
                style={{flex:2,margin:8,height:40,borderRadius:4,backgroundColor: dColor,justifyContent:'center',alignSelf:'center'}} activeOpacity={0.8}>
                    <Text style={{fontSize:20,letterSpacing:1,fontWeight:'500',textAlign:'center',color:'#fff'}}>BOOK</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

 SplitScreen  = props => {
  
        let {Jlist,onSelect,selected,index,selection} = props
        Jlist.sort((a,b) =>  a.Price.TotalDisplayFare - b.Price.TotalDisplayFare)  //initial sorting according to the users preference
        selected ? null : onSelect(index,Jlist[0])
        let selectedToken =  selected ? selection.ResultToken : null
        let isActive= false

        renderItem = ({item}) => {
            isActive = item.ResultToken === selectedToken
            return(
                    <SplitCard isActive={isActive} selection={selection} selected={selected} onSelect={onSelect} data={item} index={index}/>
                //     <TouchableOpacity onPress={() => onSelect(index,data)} style={{height:30,borderWidth:0.5,justifyContent:'center',backgroundColor: isActive ? eblue : 'transparent'}}>
                //     <Text style={{textAlign:'center'}}>{data.Price.TotalDisplayFare}</Text> 
                // </TouchableOpacity>
            )
        }

        const extractKey = ({ ResultToken }) => ResultToken
        return(
            <View style={{flex:1}}>
                   <FlatList
                                style={{flex:1,marginLeft:index?2:0}}
                                data={Jlist}
                                renderItem={renderItem}
                                keyExtractor={extractKey}
                            />
                {/* {
                        Jlist.map((data,id)=>{
                             isActive = data.ResultToken === selectedToken
                            return(
                                    <SplitCard isActive={isActive} selection={selection} selected={selected} onSelect={onSelect} data={data} index={index} id={id} key={id}/>
                                //     <TouchableOpacity onPress={() => onSelect(index,data)} style={{height:30,borderWidth:0.5,justifyContent:'center',backgroundColor: isActive ? eblue : 'transparent'}}>
                                //     <Text style={{textAlign:'center'}}>{data.Price.TotalDisplayFare}</Text> 
                                // </TouchableOpacity>
                            )
                        }
                        )
                   
                } */}
            </View>
        )
   
}
