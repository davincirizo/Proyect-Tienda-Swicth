import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {show_alert_danger, show_alert_succes} from '../general/notifications/ShowAlert';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import storage from "../storage/Storage.jsx";
import {PulseLoader } from "react-spinners";
import {useNavigate} from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import {loginApi} from "../apis/QueryAxios.jsx";
import {handleResponse} from "../general/HandleResponse.jsx";



const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    height:300,
    bgcolor: '#858585',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function LoginUser (){
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors([])
    }
    const [errors,setErrors] = useState([]);
    const url_native = import.meta.env.VITE_BACKEND_URL_native
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const csrf = async()=>{
        await axios.get(`${url_native}/sanctum/csrf-cookie`);
    }
    const register_user = async (data) =>{
        setErrors([])
        try{
            setLoading(true)
            await csrf();
            const res = await loginApi.post(``,{
                email:data.email,
                password:data.password,
                }
            )
            if(res.data.token){
                storage.set('authToken',res.data.token);
                storage.set('authUser',res.data.data);
            }
            setLoading(false)
            setOpen(false)
            show_alert_succes(res.data.msg)
            navigate('/')


        }
        catch(e){
            setLoading(false)
            handleResponse(e,navigate,setErrors,handleClose,null)
        }
    }

    return(
        <>
            <Button onClick={handleOpen}>LOGIN</Button>
            <Modal
                open={open}
                onClose={handleClose}>

                <Box sx={style}>
                    {loading ? (
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top:'50%',
                        transform: 'translateX(-50%)'}}>

                        <PulseLoader

                            size={40}
                            color="#1C0E74"
                        />
                    </div>
                    ):
                    <form  onSubmit={handleSubmit(register_user)} >

                        <div className='input-group mt-3'>
                            <span className='input-group-text'><MailIcon/></span>
                            <input className='form-control bg-light text-dark' placeholder='Email' type="email" {...register('email')}/>
                        </div>
                        {errors.email &&(
                            <small className='fail'>
                                {errors.email}
                            </small>
                        )}

                        <div className='input-group mt-3'>
                            <span className='input-group-text'><VpnKeyIcon/></span>
                            <input className='form-control bg-light text-dark'  placeholder='Password' style={{'&::placeholder': {color: 'red'}}}  type="password" {...register('password')}/>
                        </div>
                        {errors.password &&(
                            <small className='fail'>
                                {errors.password}
                            </small>
                        )}

                        <div className='fixed-bottom text-center mb-5'>
                            <button  type='submit' className='btn btn-dark'>
                                Iniciar Sesion
                                <span className='mr-3'><LoginIcon/></span>
                            </button>
                        </div>

                    </form>}
                    <div  className='fixed-bottom text-center mb-3'>
                        <ForgotPasswordForm/>
                    </div>
                </Box>

            </Modal>
    </>
    )
}