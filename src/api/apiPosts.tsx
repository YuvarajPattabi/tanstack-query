import axios from "axios";
import { URL } from "../_global";

export const fetchPosts = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export const getIndividualPost = async (id: any) => {
  return await axios.get(`${URL}/${id}`).then((res) => res.data);
};

export const addPost = async (post:any) => {
  return await axios.post(URL,post).then((res) => res.data);
};


export const updatePost = async (userid: any, post:any) => {
    return await axios.patch(`${URL}/${userid}`,post).then((res) => res.data);
};

export const deletePost = async (id: any) => {
    return await axios.delete(`${URL}/${id}`, id).then((res) => res.data);
};