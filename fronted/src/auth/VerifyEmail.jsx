import NavBarUser from "../user/general/NavBarUser.jsx";
import { useNavigate, useParams } from 'react-router-dom'
import {show_alert_danger, show_alert_succes, show_alert_warning} from "../general/notifications/ShowAlert.jsx";
import axios from "axios";
import {useEffect} from "react";



export default function VerifyEmail (){
    const url = import.meta.env.VITE_BACKEND_URL
    const {id} = useParams()
    const {hash} = useParams()
    const navigate = useNavigate()
    const Verify = async (data) =>{
        try {
            const response = await axios.get(`${url}/email/verify/${id}/${hash}`)

                // navigate('/login')
                const msg = response.data.message

                if(response.status == 200) {
                    show_alert_succes(msg)
                    navigate('/')

                }
                else{
                   show_alert_warning(msg)
                    navigate('/')

                }


        }
        catch (e){

                const msg = e.response.data.message
                show_alert_danger(msg)
                console.log('Hola')
                navigate('/')

            }

        }

    useEffect(() =>{
        Verify()
    },[])



    return(
    <>
       <NavBarUser/>
    </>
    )

}