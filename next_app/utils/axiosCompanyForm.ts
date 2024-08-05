import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.NEXT_PUBLIC_RAILS_HOST

export const axiosCompanyForm = axios.create({
    baseURL: `${host}/api/auth`,
})