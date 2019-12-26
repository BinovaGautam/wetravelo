const secondReducer = (state = {counter:0,name:'binova'} , action) =>{
     switch(action.type){
         case 'CHANGE_NAME':
             return {...state,name:action.name,counter : state.counter+1}
     }
    return {...state,counter : state.counter+5}
}

export default secondReducer;