import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput,FlatList,Image,TouchableOpacity,Dimensions,ScrollView,StatusBar } from 'react-native';
import { InstantSearch,connectInfiniteHits,connectSearchBox,connectHighlight,connectStateResults } from 'react-instantsearch-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const color = "#fff"
const dColor = "#026C70"
const {height,width} = Dimensions.get('window')

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: '_highlightResult',
    });
    const highlightedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted)
        return (
          <Text key={idx} style={{ fontWeight:'bold' }}>
            {part.value}
          </Text>
        );
      return part.value;
    });
    return <Text>{highlightedHit}</Text>;
  }
);

const Hits = connectInfiniteHits(({ hits, hasMore, refine,get,selected }) => {

  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
        if (hasMore) {
          refine();
        }
      };
    
    clicked = data =>{
      // alert(item.attribute.name)
      
      get(data)
      
  
    }

    
    
    return (
      <ScrollView>
            <FlatList
              data={hits}
              onEndReached={onEndReached}
              keyExtractor={(item, index) => item.objectID}
              renderItem={({ item }) => {
                 if(item.IATA) {
                    return (
              
                        <TouchableOpacity onPress={()=>this.clicked(item)} style={{ height:70, borderBottomWidth:1,backgroundColor: "#fff",borderColor:"#dedede" }}>
                          
                          <View style={{ justifyContent: 'space-between',flex: 1,paddingHorizontal:12,flexDirection:'row' }}>
      
                          <View style={{justifyContent:'center'}}>
                            <Text style={{fontSize:16,color:"#000"}} > 
                                <Highlight attribute="City" hit={item} />
                                
                            </Text>
                            <Text>
                              <Highlight attribute="AirportName" hit={item} />
                            </Text>  
                          </View>

                           <Text style={{fontSize:20,color:dColor,alignSelf:'center'}} > 
                                <Highlight attribute="IATA" hit={item} />
                                
                            </Text>
                          

                         
                          
                          </View>
                        </TouchableOpacity>
                      
                      
                        
                      );
                 }
              }}
            />
      </ScrollView>
      );
});


const SearchBox = connectSearchBox(({ refine, currentRefinement,select,currentMed }) => {

  const styles = {
    height: 70,
    backgroundColor: '#fff',
    borderRadius:4,
    margin: 10,
    
    flex: 1,
    flexDirection: 'row',
  };

  const box_styles = {
    height: 60,
    backgroundColor: '#fff',
    borderRadius:4,
    padding: 8,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flex: 5,
    fontSize:24,fontWeight:'500'
  };
  
  reset = () =>{
    refine()
    select(true)
  }

  changeText = text =>{
    text.length ? select(false) : select(true)
    refine(text)
  }
  return (
   <View style={styles} >
    <TextInput
      autoFocus={true}
      style={box_styles}
      onChangeText={text => changeText(text)}
      value={currentRefinement}
      editable={currentMed? false : true}
      placeholder={'Enter City/Airport Name'}
      clearButtonMode={'always'}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
    />
    
   </View> 
  );
});

const Content = connectStateResults(({searchState,getdata,selected})=>
         searchState && searchState.query ?
         <Hits selected={selected} get={getdata} />
         :
         <View >
             <Text style={{textAlign:'center',fontSize:18,top:10}}>Search For Airports</Text>
          </View>
)

export default class SearchPort extends Component {
    static navigationOptions = {
      //  header : null,
        title : 'SELECT AIRPORT',
        headerStyle : {
            backgroundColor: '#FFF' ,
            elevation: 3,
            borderBottomWidth:0,
        },
        headerTintColor : '#000',
        headerTitleStyle : {
            fontWeight : 'bold'
        }
    }
  constructor(props) {
    super(props);
    this.state = {
      med:[],
      currentMed:null,
      selected:false
    };
  }

  getdata = (data,id) =>{
     //saving selected medicine for a temporary basis
    //  const currentMed = data
    //  this.setState({currentMed,index: id || null})
     let {navigation} = this.props
     let type = navigation.getParam('type',null)
     if(type) type({IATA:data.IATA,City : data.City})
     
     navigation.goBack()
  }

  addMed = (currentMed) =>{
    const med = this.state.med
    med.push(currentMed);
    this.setState({
                selected: true,med,currentMed:null
              })
  }

  edit = (data) =>{
    let med = this.state.med
    med[this.state.index] = data
    this.setState({
      selected: true,med,currentMed:null,index:null
    })
  }

  cancel = () =>{
    
    this.setState({
      selected: true,currentMed:null
    })
  }

  delete = id =>{
    let med = this.state.med
   // alert(id)
    med.splice(id,1)
    this.setState({med})
  }
  render() {
     const med = this.state.med
     const selected = this.state.selected
     const currentMed = this.state.currentMed
    return (
      <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {/* <Header style={{backgroundColor:'#fff',borderBottomWidth:0}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header> */}
 
       

         <InstantSearch
          appId="ZW7OWRND7Z"
          apiKey="a665265bd5a5d1795c8dca64bb304f4a"
          indexName="airports" >

              <View style={styles.searchContainer} >
               <SearchBox currentMed={currentMed} select={bool=>this.setState({selected:bool})} />
              </View>

              {/* {selected?
                  med.map((data,id)=>
                  <MedPanel delete={this.delete} index={id} edit={this.getdata} data={data} key={id}/>
                  )

                : */}
                <View >
                  <Content selected={this.state.selected} medicines={med} getdata={this.getdata}/> 
                </View>
              
        </InstantSearch>

        {/* { currentMed  ? 
          <MedDescription  edit={this.edit} cancel={this.cancel}  currentMed={currentMed} addMed={this.addMed}/>
        :null} */}

        {/* {med.length && !currentMed ?
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('prescription',{med})} style={styles.bottom}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20,fontWeight:'bold'}}>Continue</Text>
          </TouchableOpacity>
        :null} */}
        
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
    searchContainer :{backgroundColor: '#FFF',height:60,justifyContent: 'center',shadowColor: "#000",},
    // shadowOffset: { width: 0, height: 0, },shadowOpacity: 0.27,shadowRadius: 4.65,},
    bottom:{bottom:0,left:0,height:60,width:width,borderTopWidth:0,borderColor:'#ccc',elevation:6,justifyContent: 'center',
    opacity:0.98,backgroundColor: color,position:'absolute'},
})