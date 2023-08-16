import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {show_alert_danger, show_alert_succes} from '../general/notifications/ShowAlert';
import { useState } from 'react';
import Link from '@mui/material/Link';
import MailIcon from '@mui/icons-material/Mail';
import {PulseLoader } from "react-spinners";
import {useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';


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
export default function ForgotPasswordForm (){
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors([])
    }
    const [errors,setErrors] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()
    // console.log(storage.get('authToken'))
    // storage.remove('authToken')
    // storage.remove('authUser')


    const forgot_password = async (data) =>{
        setErrors([])
        try{
            setLoading(true)
            const res = await axios.post(`${url}/forgot-password`,{
                    email:data.email,
                }
            )

            setLoading(false)
            setOpen(false)
            show_alert_succes(res.data.msg)
            navigate('/')


        }
        catch(e){
            setLoading(false)
                if(e.response.status == 400) {
                setErrors(e.response.data.errors)
            }
            else {
                setOpen(false)
                show_alert_danger(e.response.data.msg)
            }
        }
    }



    return(
        <>
            <Link onClick={handleOpen}>Olvido su contraseña</Link>

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
                        <form  onSubmit={handleSubmit(forgot_password)} >

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><MailIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Email' type="email" {...register('email')}/>
                            </div>
                            {errors.email &&(
                                <small className='fail'>
                                    {errors.email}
                                </small>
                            )}


                            <div className='fixed-bottom text-center mb-5'>
                                <button  type='submit' className='btn btn-dark'>
                                    Enviar
                                    <span className='mr-3'><SendIcon/></span>
                                </button>
                            </div>
                        </form>}
                </Box>
            </Modal>
        </>
    )
}