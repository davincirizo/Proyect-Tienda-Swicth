import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL

export const categoryApi = axios.create({
    baseURL:`${backend}/admin/categories`
})

export const usersApi = axios.create({
    baseURL:`${backend}/admin/users`
})

export const roleApi = axios.create({
    baseURL:`${backend}/admin/roles`
})
export const permissionsApi = axios.create({
    baseURL:`${backend}/admin/permissions`
})