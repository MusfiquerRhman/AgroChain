import axios from "axios";
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

export const getAllSeasons = async () => {
    try {
        return await axios.get(`${API_URL}/season`)
    }
    catch (err) {
        return -1;
    }
}

