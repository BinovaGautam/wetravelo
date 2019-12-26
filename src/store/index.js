import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers/index'
import thunk from  'redux-thunk'

const middlewares = [thunk]
// const initialState = {name:'Binova'}
const store = createStore(rootReducer,applyMiddleware(...middlewares));
// console.warn(store.getState())
export default store;