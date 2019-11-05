import {createStackNavigator} from 'react-navigation'
import {Platform} from 'react-native'
import Signup from './Signup'
import Signin from './Signin'


let ios = Platform.OS === 'ios' ? true : false



let AuthStack = createStackNavigator({
  
   SignUp : Signup,
   SingIn : Signin
},{
    defaultNavigationOptions:{
        headerStyle:{
            marginTop: !ios ? 24 :0
        }
    }
})

export default AuthStack;