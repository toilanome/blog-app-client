import axios from "axios";

const token = localStorage.getItem('accessToken')

export const baseAuth = axios.create({
    baseURL : 'https://blog-app-serverr.onrender.com/api/auth'
})

export const baseCategory = axios.create({
    baseURL : 'https://blog-app-serverr.onrender.com/api/category'
})

export const baseComment = axios.create({
    baseURL : 'https://blog-app-serverr.onrender.com/api/comment'
})

export const InsanceToken = axios.create({
    baseURL : 'https://blog-app-serverr.onrender.com/api/auth',
    
    headers: {Authorization: `Bearer ${token}`}
})

export const TokenComment = axios.create({
    baseURL : 'https://blog-app-serverr.onrender.com/api/comment',
    
    headers: {Authorization: `Bearer ${token}`}
})