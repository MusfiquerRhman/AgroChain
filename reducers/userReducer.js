import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import Router from 'next/router'

const initialStateValue = {
    userEmail: "",	
    userPhone: "",	
    userId: "",	
    userName: "",	
    userJoinDate: "",	
    token: "",	
    userType: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialStateValue;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPhone");
            localStorage.removeItem("userType");
            localStorage.removeItem("userJoinDate");

            axios.post('/api/user/logout').then(res => {
                Router.reload('/');
            }).catch(err => {
                console.log(err.message);
            });
        }
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer