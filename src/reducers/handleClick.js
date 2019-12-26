const handleClick = (state = {counter:1,name:'gautam'} , action) =>{
    switch(action.type){
        case 'INCREASE':
            return {...state,counter : state.counter*3}
    }
    return {...state,name:'jhinga lala hoooo'}
}

export default handleClick;