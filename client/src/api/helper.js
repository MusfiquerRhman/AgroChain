import axios from "axios";
axios.defaults.withCredentials = true;

export const authAxios = axios.create({
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
})