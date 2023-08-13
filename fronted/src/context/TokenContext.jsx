import {createContext, useContext, useEffect, useState} from "react";
import storage from "../storage/Storage.jsx";

export const TokenContext = createContext()

export const TokenContextProvider = ({children})=>{
    const [token,setToken] = useState(null)
    const values = {token,setToken}
    useEffect (() =>{
        storage.verify('authToken')
        setToken(storage.get('authToken'))
    },[])
    return(
        <TokenContext.Provider value={values}>
            {children}
        </TokenContext.Provider>
    )
}

export const useAuthContext = () =>{
    const context = useContext(TokenContext)
    return context
}