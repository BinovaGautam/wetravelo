const initialState = {type:'OneWay',CabinClass:'Economy',travellers:1,cabin:true,AdultCount:1,ChildCount:0,InfantCount:0,recent: {}}


const FlightReducer = (state = initialState, action) => {
    let payload = action.payload || {}
    switch(action.type){
        case 'INITIAL_DETAILS':
            return {...state,...payload,recent:{...payload}}
        case 'SELECT_PORT':
            return {...state ,[payload.title] : payload.data }
        
        case 'TRAVELLERS':
            return{...state,...payload}
    }
    return state
}

export default FlightReducer;