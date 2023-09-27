import NavBarUser from "../../user/general/NavBarUser.jsx";
import {profileApi} from "../../apis/QueryAxios.jsx";
import storage from "../../storage/Storage.jsx";
import {notification_succes} from "../../general/notifications/NotificationTostify.jsx";
import {handleResponse} from "../../general/HandleResponse.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PulseLoader} from "react-spinners";
import * as React from "react";

export default function SetChangePasswordProfile(){
    const navigate = useNavigate()
    const {token} = useParams()
    const [loading, setLoading] = useState(false);
    console.log(token)

    const change_password = async (data) =>{
        try{
            setLoading(true)
            const res = await profileApi.get(`change_email/${storage.get('authUser').id}/${token}`, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            setLoading(false)
            notification_succes(res.data.msg)
            storage.set('authUser',res.data.user)
            navigate('/')

        }
        catch(e){
            setLoading(false)
            handleResponse(e, navigate, null)
        }
    }

    useEffect(() =>{
        change_password()
    },[])



    return(
       <>
        <NavBarUser/>
           {loading ? (<div style={{
                   position: 'absolute',
                   left: '50%',
                   top: '50%',
                   transform: 'translateX(-50%)'
               }}>

                   <PulseLoader

                       size={40}
                       color="#1C0E74"
                   />
               </div>
           ):null}
    </>
   )

}
