import axios from "axios";
import { authAxios } from "../helper";
const API_URL = 'http://localhost:5000/api/products'

axios.defaults.withCredentials = true

export const fetchProducts = async () => {
    try {
        return await axios.get(`${API_URL}`);
    }
    catch(err){
        return -1;
    }
}

export const productDetails = async (id) => {
    try {
        return await axios.get(`${API_URL}/${id}`);
    }
    catch(err){
        return -1;
    }
}

