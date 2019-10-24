import {createStore} from 'redux';
import rootReducer from '../reducers/index'
import handleClick from '../reducers/handleClick'
// const initialState = {name:'Binova'}
const store = createStore(rootReducer);
console.log(store.getState())
export default store;