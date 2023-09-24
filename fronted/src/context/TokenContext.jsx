import {createContext, useContext, useEffect, useState} from "react";
import storage from "../storage/Storage.jsx";

export const TokenContext = createContext()

export const TokenContextProvider = ({children})=>{
    const [admin,setAdmin] = useState(null)

    const values = {admin,setAdmin,user,setUser,saler,setSaler}
    return(
        <TokenContext.Provider value={values}>
            {children}
        </TokenContext.Provider>
    )
}

export const useTokenContext = () =>{
    const context = useContext(TokenContext)
    return context
}