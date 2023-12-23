import axios from "axios";

const token = localStorage.getItem('accessToken')

export const baseAuth = axios.create({
    baseURL : 'http://localhost:4000/api/auth'
})

export const baseCategory = axios.create({
    baseURL : 'http://localhost:4000/api/category'
})

export const baseComment = axios.create({
    baseURL : 'http://localhost:4000/api/comment'
})

export const InsanceToken = axios.create({
    baseURL : 'http://localhost:4000/api/auth',
    
    headers: {Authorization: `Bearer ${token}`}
})

export const TokenComment = axios.create({
    baseURL : 'http://localhost:4000/api/comment',
    
    headers: {Authorization: `Bearer ${token}`}
})