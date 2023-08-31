import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL

export const categoryApi = axios.create({
    baseURL:`${backend}/admin/categories`,
    timeout: 30000,
})

export const usersApi = axios.create({
    baseURL:`${backend}/admin/users`,
    timeout: 30000,
})

export const roleApi = axios.create({
    baseURL:`${backend}/admin/roles`,
    timeout: 30000,
})
export const permissionsApi = axios.create({
    baseURL:`${backend}/admin/permissions`,
    timeout: 30000,
})

export const labelsApi = axios.create({
    baseURL:`${backend}/admin/labels`,
    timeout: 30000,
})