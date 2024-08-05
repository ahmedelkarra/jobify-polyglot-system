import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.NEXT_PUBLIC_DJANGO_HOST

export const axiosForm = axios.create({
    baseURL: `http://127.0.0.1:3000/api/auth/`,
    // withCredentials: true
})