import axios from 'axios';

export const authAxios = axios.create({
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
})
