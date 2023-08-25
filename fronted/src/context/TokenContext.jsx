import {createContext, useContext, useEffect, useState} from "react";
import storage from "../storage/Storage.jsx";

export const RoleContext = createContext()

export const RoleContextProvider = ({children})=>{
    const [admin,setAdmin] = useState(null)
    const [user,setUser] = useState(null)
    const [saler,setSaler] = useState(null)

    const getRole = () =>{
        if(storage.get('authUser')) {
            const admin_bool =  storage.get('authUser').roles.some(role => role.name == 'Admin')
            setAdmin(admin_bool)
            const user_bool =  storage.get('authUser').roles.some(role => role.name == 'Saler')
            setAdmin(user_bool)
            const saler_bool =  storage.get('authUser').roles.some(role => role.name == 'User')
            setAdmin(saler_bool)
        }
        else{
            setAdmin(false)
            setUser(false)
            setSaler(false)
        }

    }

    useEffect (() =>{
        getRole()
    },[])


    const values = {admin,setAdmin,user,setUser,saler,setSaler}
    return(
        <RoleContext.Provider value={values}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRoleContext = () =>{
    const context = useContext(RoleContext)
    return context
}