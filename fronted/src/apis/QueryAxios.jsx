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
export const logoutApi = axios.create({
    baseURL:`${backend}/logout`,
    timeout: 30000,
})
export const loginApi = axios.create({
    baseURL:`${backend}/login`,
    timeout: 30000,
})
export const profileApi = axios.create({
    baseURL:`${backend}/profile`,
    timeout: 30000,
})
export const companyApi = axios.create({
    baseURL:`${backend}/admin/companies`,
    timeout: 30000,
})