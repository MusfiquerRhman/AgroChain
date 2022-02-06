import axios from "axios";
import { authAxios } from "../helper";
const API_URL = 'http://localhost:5000/api/user'

axios.defaults.withCredentials = true

export const register = async (name, businessName, password, address, phoneNo, email) => {
    try {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("businessName", businessName);
        formdata.append("password", password);
        formdata.append("address", address);
        formdata.append("phoneNo", phoneNo);
        formdata.append("email", email);
        return await axios.post(`${API_URL}/registration`, formdata);
    }
    catch (err) {
        return -1;
    }
}

export const login = async (email, password) => {
    try {
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        return await axios.post(`${API_URL}/login`, formdata);
    } 
    catch (err) {
        return -1;
    }
}

export const isLoggedIn = async () => {
    try {
        return await authAxios.get(`${API_URL}/isLoggedIn`)
    }
    catch (err){
        return -1;
    }
}

export const logout = async () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPhone");
        localStorage.removeItem("keyboardCat");
        localStorage.removeItem("userJoinDate");
        return await axios.post(`${API_URL}/logout`);
    }
    catch(err){
        return -1;
    }
}

export const addToCart = async (productId, quantity) => {
    try {
        const formdata = new FormData();
        formdata.append("userId", localStorage.getItem("userId"));
        formdata.append("productId", productId);
        formdata.append("quantity", quantity);

        return await authAxios.post(`${API_URL}/cart`, formdata);
    }
    catch (err){
        console.log(err)
        return -1;
    }
}

export const userCartItems = async (userid) => {
    try {
        return await authAxios.get(`${API_URL}/cart/${userid}`);
    }
    catch(err){
        return -1;
    }
}

export const submitCart = async (userId) => {
    try{
        return await authAxios.post(`${API_URL}/cart/submit/${userId}`);
    }
    catch(err){
        return -1;
    }
}

export const updateCart = async (CART_ID, quantity) => {
    try{
        const formdata = new FormData();
        formdata.append("quantity", quantity);

        return await authAxios.post(`${API_URL}/cart/update/${CART_ID}`, formdata);
    }
    catch(err){
        return -1;
    }
}

export const deleteCart = async(CART_ID) => {
    try{
        return await authAxios.get(`${API_URL}/cart/delete/${CART_ID}`);
    }
    catch(err){
        return -1;
    }
}

