import moment from 'moment'
let RoomGuests = [{NoOfAdults:2,NoOfChild:0,ChildAge:[]}]
const initialState = {type:'domestic',NoOfGuests:2,NoOfRooms: 1, CheckInDate: moment(new Date()) , CheckOutDate : moment().add(1,'days'),recent: {},RoomGuests,NoOfNights:1}



const HotelReducer = (state = initialState, action) => {
    let payload = action.payload || {}
    switch(action.type){
        case 'ALTER_HOTEL':
            return {...state,...payload}
        case 'SELECT_ROOMS':
            return {...state,...payload}
        case 'SELECT_CITY':
            return {...state ,[payload.title] : payload.data }
        
        case 'GUESTS':
            return{...state,...payload}
    }
    return state
}

export default HotelReducer;