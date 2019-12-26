import {combineReducers} from 'redux';
import handleClick from './handleClick'
import secondReducer from './secondReducer'
import AuthReducer from './AuthReducer'
import FlightReducer from './FlightReducer'

const rootReducer = combineReducers({
    test : handleClick,
    flight : FlightReducer,
    secondReducer,
    auth : AuthReducer
}
)
 


export default rootReducer