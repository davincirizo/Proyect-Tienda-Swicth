import MenuItem from "@mui/material/MenuItem";
import storage from "../storage/Storage.jsx";
import {show_alert_succes} from "../general/notifications/ShowAlert.jsx";
import {logoutApi} from "../apis/QueryAxios.jsx";
import {useNavigate} from "react-router-dom";
import {handleResponse} from "../general/HandleResponse.jsx";

export default function Logout(props) {
    const {setLoading} = props
    const navigate = useNavigate()
    const logout = async()=>{
        const token_id = storage.get('authToken')
        try {
            setLoading(true)
            const res = await logoutApi.post('',{},{
                headers: {
                    'Authorization': `Bearer ${token_id}`
                }
            })

            storage.remove('authToken');
            storage.remove('authUser');
            setLoading(false)
            show_alert_succes(res.data.msg)
            navigate('/')
        }
        catch (e){
           handleResponse(e,navigate,null,null,null)
        }





    }

    return(
        <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
    )
}