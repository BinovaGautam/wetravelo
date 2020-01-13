import React, { Component } from 'react'
import { Text, View,TouchableOpacity, ScrollView, Image,Dimensions } from 'react-native'
import { Loader, strings } from '../../assets'

 const {height,width} = Dimensions.get('screen')
 const {darktext,dColor,lightGreen,lightTeal,pink,grey} = strings

export default class Baggage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let {screenProps} = this.props
        let {Baggage} = screenProps || {}
        // console.warn(Baggage[0])
        this.setState({Baggage : Baggage || [],fetched:true})
    }
    render() {
        let {Baggage,fetched} = this.state
        // console.warn(Baggage.)
        return (
            <View style={{flex:1}} >
                {fetched ? 
                    Baggage.length ? 
                    <ScrollView style={{flex:1}} >
                        {
                            Baggage.map((options,index) =>
                              <View style={{margin:8,borderBottomWidth:grey,borderBottomWidth:20}}>
                                {
                                    options.map((option,id) => {
                                        let {Origin,Destination,} = option
                                    return(
                                        <TouchableOpacity key={id} activeOpacity={0.8} style={{height:60,borderBottomWidth:0.9,borderColor:grey,flexDirection:'row'}}>
                                            <Text style={{textAlign:'center'}}>{Origin} </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                              </View>
                            )
                        }
                    </ScrollView>
                    :
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Image style={{width: width-20,height:width-10}} source={require('../../assets/Images/baggage.png')}/>
                        <Text style={{marginHorizontal:25,textAlign:'center',fontWeight:'600',color:darktext,letterSpacing:1,fontSize:26}}>
                            No Baggage Options Available.
                        </Text>
                    </View>
                    :<Loader/> }
            </View>
        )
    }
}
