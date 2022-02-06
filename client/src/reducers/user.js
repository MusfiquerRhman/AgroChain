const initialStateValue = {
    userEmail: "",	
    userPhone: "",	
    userId: "",	
    userName: "",	
    userJoinDate: "",	
    token: "",	
    userType: ""
}

export default (users = initialStateValue , action) => {
    switch(action.type){
        case 'USER_DETAILS':
            return action.payload;
        default:
            return users;
    }
}