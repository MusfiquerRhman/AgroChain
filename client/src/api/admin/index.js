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
        return await authAxios.delete(`${API_URL}/season/${id}`);
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

        return await authAxios.put(`${API_URL}/season/${id}`, formdata);
    }
    catch(err){
        return -1;
    }
}


export const seasonshort = async () => {
    try {
        return await authAxios.get(`${API_URL}/seasonshort`);
    }
    catch(err){
        return -1;
    }
}


export const getallTags = async () => {
    try {
        return await authAxios.get(`${API_URL}/tags`);
    }
    catch(err){
        return -1;
    }
}


export const addTags = async (tagName, tagDescription) => {
    try{
        const formdata = new FormData();
        formdata.append("tagName", tagName);
        formdata.append("tagDescription", tagDescription);
        return await authAxios.post(`${API_URL}/tags`, formdata)
    }
    catch(err){
        return -1;
    }
}


export const updateTags = async (tagName, tagDescription, tagId) => {
    try{
        const formdata = new FormData();
        formdata.append("tagName", tagName);
        formdata.append("tagDescription", tagDescription);
        return await authAxios.put(`${API_URL}/tags/${tagId}`, formdata)
    }
    catch(err){
        return -1;
    }
}


export const deleteTags = async (tagId) => {
    try{
        return await authAxios.delete(`${API_URL}/tags/${tagId}`);
    }
    catch(err){
        return -1;
    }
}

export const tagsShort = async () => {
    try {
        return await authAxios.get(`${API_URL}/tagsshort`);
    }
    catch(err){
        return -1;
    }
}