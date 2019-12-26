import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput,FlatList,Image,TouchableOpacity,Dimensions,ScrollView,StatusBar,Platform } from 'react-native';
import { InstantSearch,connectInfiniteHits,connectSearchBox,connectHighlight,connectStateResults } from 'react-instantsearch-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
const Countries = require('../assets/Countries.json')

const color = "#fff"
const dColor = "#026C70"
const {height,width} = Dimensions.get('window')



let ios =Platform.OS === 'ios' ? true : false


export default class SelectCountry extends Component {
    static navigationOptions = {
      //  header : null,
        title : 'SELECT NATIONALITY',
        headerStyle:{
            borderBottomWidth:0,
            elevation:0,
            marginTop: ios ? 0 : 24
        }
       
    }
  constructor(props) {
    super(props);
    this.state = {
      items : Countries
    };
  }
  componentDidMount() {
    //   alert(Countries.length)
  }
  

  changeText = text =>{
    var updatedList = this.state.items;
    if(text.length > 0){
       
        updatedList = updatedList.filter(item =>{
          return item.nationality.toLowerCase().search(
            text.toLowerCase()) !== -1;
        });
    }else{
      
        updatedList = Countries
    }
    this.setState({items: updatedList});
  }

  clicked = country =>{
      let {navigation} = this.props
      let SelectCountry = navigation.getParam('getCountry',null)
      if(SelectCountry) SelectCountry(country)
      navigation.goBack()
  }

 
  render() {
       let {items} = this.state
    return (
      <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
        <StatusBar backgroundColor="#fff" translucent={true} barStyle="dark-content" />
      

       

              <View style={[styles.searchContainer,{elevation:3}]} >
              <View style={styles.cotainer} >
                    <TextInput
                    autoFocus={true}
                    style={styles.box_styles}
                    onChangeText={text => this.changeText(text)}
                    placeholder={'Search For Country'}
                    clearButtonMode={'always'}
                    spellCheck={false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    />
                    
                </View> 


              </View>

             
              <FlatList
                    data={items}
                    keyExtractor={(item, index) => item.num_code}
                    renderItem={({ item }) => {
                        
                            return (
                    
                                  <TouchableOpacity onPress={()=>this.clicked(item)}  activeOpacity={0.5}
                                  style={{ height:50, borderBottomWidth:1,backgroundColor: "#fff",borderColor:"#dedede",justifyContent:'center' }}>
                                
                                     <Text style={{fontSize:18,color:"#000",margin:8}} >  {item.nationality}  </Text>
                                   </TouchableOpacity>
                            
                            
                                
                            );
                        
                    }}
                />
               
        
        
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
    searchContainer :{backgroundColor: '#FFF',height:60,justifyContent: 'center',shadowColor: "#000",},
    cotainer:{
        height: 70,
        backgroundColor: '#fff',
        borderRadius:4,
        margin: 10,
        
        flex: 1,
        flexDirection: 'row',
      },
      box_styles :{
        height: 60,
        backgroundColor: '#fff',
        borderRadius:4,
        padding: 8,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        flex: 5,
        fontSize:24,fontWeight:'500'
      },
    // shadowOffset: { width: 0, height: 0, },shadowOpacity: 0.27,shadowRadius: 4.65,},
    bottom:{bottom:0,left:0,height:60,width:width,borderTopWidth:0,borderColor:'#ccc',elevation:6,justifyContent: 'center',
    opacity:0.98,backgroundColor: color,position:'absolute'},
})