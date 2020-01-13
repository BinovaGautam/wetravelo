import {combineReducers} from 'redux';
import handleClick from './handleClick'
import secondReducer from './secondReducer'
import AuthReducer from './AuthReducer'
import FlightReducer from './FlightReducer'
import HotelReducer from './HotelReducer';

const rootReducer = combineReducers({
    test : handleClick,
    flight : FlightReducer,
    secondReducer,
    auth : AuthReducer,
    hotel: HotelReducer
}
)
 


export default rootReducer