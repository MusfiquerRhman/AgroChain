import axios from "axios";
import { authAxios } from "../helper";
const API_URL = 'http://localhost:5000/api/avater'

axios.defaults.withCredentials = true;

export const addSeason = async (seasonName, startDay, startMonth, endDay, endMonth, description) => {
    try {
        const formdata = new FormData();
        formdata.append("seasonName", seasonName);
        formdata.append("startDay", startDay);
        formdata.append("endDay", endDay);
        formdata.append("startMonth", startMonth);
        formdata.append("endMonth", endMonth);
        formdata.append("description", description);
        return await authAxios.post(`${API_URL}/season`, formdata);
    }
    catch (err) {
        return -1;
    }
}

export const getAllSeasons = async () => {
    try {
        return await authAxios.get(`${API_URL}/season`)
    }
    catch (err) {
        return -1;
    }
}

export const deleteSeasons = async (id) => {
    try {
        return await authAxios.post(`${API_URL}/season/delete/${id}`);
    }
    catch(err){
        return -1;
    }
}

export const updateSeasons = async (seasonName, startDay, startMonth, endDay, endMonth, description, id) => {
    try{
        const formdata = new FormData();
        formdata.append("seasonName", seasonName);
        formdata.append("startDay", startDay);
        formdata.append("startMonth", startMonth);
        formdata.append("endDay", endDay);
        formdata.append("endMonth", endMonth);
        formdata.append("description", description);

        return await authAxios.post(`${API_URL}/season/update/${id}`, formdata);
    }
    catch(err){
        return -1;
    }
}

