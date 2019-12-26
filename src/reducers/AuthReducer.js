const AuthReducer = (state = {islogged:false,userDetail:{},user:{}} , action) =>{
    let user = action.user || {}
    switch(action.type){
        case 'LOG_IN':
            return {...state,islogged:action.islogged,user} 
        case 'USER_DETAIL':
            return {...state,userDetail:action.userDetail}
    }
    return {...state}
}

export default AuthReducer;