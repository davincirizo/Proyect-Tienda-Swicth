import axios from "axios";
import {useEffect} from "react";


export const storage = {
    get(key){
        const val = window.localStorage.getItem(key);

        if(!val){
            return null;
        }
        return JSON.parse(val)
    },
    set(key,val){
        window.localStorage.setItem(key,JSON.stringify(val))
    },
    remove(key){
        window.localStorage.removeItem(key);
    },
    clear(){
        window.localStorage.clear();
    },
    verify(key){
        const val = window.localStorage.getItem(key);
        if(val){
            const token = window.localStorage.getItem('authToken')
            const res = verify_token(JSON.parse(token))
            res.then((data) => {
                    if (data == false ){
                        // storage.remove('authToken')
                        // storage.remove('authUser')
                        window.localStorage.removeItem('authToken');
                        window.localStorage.removeItem('authUser');

                    }

                }

            )

        }
    }
}

const verify_token = async (token) =>{
    const url = import.meta.env.VITE_BACKEND_URL
    try{
        const res = await axios.post(`${url}/verify_token`,{
               token:token
            }
        )
        if(res.status==200){
            return true
        }
    }
    catch(e){
        if(e.response.status == 400) {
            return false
        }

    }
}



export default storage;