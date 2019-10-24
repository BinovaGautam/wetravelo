import React, { Component,useState } from 'react'
import { Text, View,Image,TouchableOpacity } from 'react-native'
import { Icon } from 'native-base';
// import handleClick from '../../reducers/handleClick';
// import FastImage from 'react-native-fast-image'
import {connect} from 'react-redux' 

const mapStateToProps = state =>({
  counter : state.counter,
  name : state.name
})

const mapDispatchToProps = dispatch =>({
    toggleHotel:() => dispatch({type:'TOGGLE_WHISHLIST'}) 
}) 

const HotelCard = (props) =>{
     const [count,setCount]  = useState(0)
     const url = "https://images.oyoroomscdn.com/uploads/hotel_image/42870/xlarge/6c5ec7192f0d94cd.jpg"
     const {name,dispatch} = props

     const wishlist = () => {
       props.toggleHotel({type:'TOGGLE_WHISHLIST'})
       console.log('oye lucky oye',props)
     }
    return(
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={wishlist}
              style={{margin:8,minHeight:150,backgroundColor:'#fff',marginTop:2,}}>
                 
             <Image  style={{ height: 150,width:'auto' }}
                source={{ uri: url }} />

                <View style={{position:'absolute',height:20,paddingHorizontal:4,backgroundColor:'teal',top:5,left:5,elevation:3,justifyContent:'center'}}>
                      <Text style={{color:'#fff',fontSize:10,fontWeight:'500'}}> 4.1 <Icon name="star" type="Entypo" style={{color:'#fff',fontSize:10,fontWeight:'500'}}/>
                      | 674 Ratings</Text>
                </View>

                <View style={{padding:8}}>
                    <Text style={{fontSize:16,fontWeight:'500',color:'#000'}}> Lemon Tree Hotel Garchibowli </Text>
                    <Text style={{margin:3,color:'#95a5a6',fontSize:12}}>Near Laxmi Nagar Metro {props.name} </Text>

                    <View style={{flexDirection:'row',marginVertical:3}}>
                      <Text style={{fontSize:18,fontWeight:'500',color:'#000'}}> ₹1225 </Text>
                      <Text style={{fontSize:14,color:'#95a5a6',textDecorationLine:'line-through'}}> ₹2332 </Text>
                      <Text style={{fontSize:14,fontWeight:'500',color:'teal'}}> 47% OFF </Text>
                    </View>


                    
   
                   
                </View>
        
                <View style={{backgroundColor:'#ddd',height:0.7}}/>
             </TouchableOpacity>
        </View>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(HotelCard)

// borderWidth:0.5,borderRadius:4,borderColor:'#ddd',