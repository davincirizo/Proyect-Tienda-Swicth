import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {show_alert_danger, show_alert_succes} from '../general/notifications/ShowAlert';
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import {useNavigate, useParams} from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import NavBarUser from "../user/general/NavBarUser.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';


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
export default function ForgotPasswordSet (){
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors([])
        navigate('/')
    }
    const [errors,setErrors] = useState([]);
    const [error_password,setError_password] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const {token} = useParams()

    useEffect(() =>{
        handleOpen()
    },[])



    const reset_password = async (data) =>{
        setErrors([])
        try{
            setLoading(true)
            const res = await axios.post(`${url}/reset-password/${token}`,{
                    password:data.password,
                    confirm_password:data.confirm_password,
                }
            )

            setLoading(false)
            setOpen(false)
            show_alert_succes(res.data.msg)
            navigate('/')


        }
        catch(e){
            setLoading(false)
            console.log(e)
            if(e.response.status == 400) {
                if(e.response.data.errors) {
                    setErrors(e.response.data.errors)
                }
                if(e.response.data.confirm_password){
                    setError_password(e.response.data.confirm_password)
                }
            }
            else {
                setOpen(false)
                show_alert_danger(e.response.data.msg)
                navigate('/')
            }
        }
    }



    return(
        <>
            {/*<Link onClick={handleOpen}>Olvido su contraseña</Link>*/}
            <NavBarUser/>
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
                        <form  onSubmit={handleSubmit(reset_password)} >

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><VisibilityIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Contraseña' type="password" {...register('password')}/>
                            </div>
                            {errors.password &&(
                                <small className='fail'>
                                    {errors.password}
                                </small>
                            )}

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><VisibilityIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Confirmar Contraseña' type="password" {...register('confirm_password')}/>
                            </div>
                            {error_password &&(
                                <small className='fail'>
                                    {error_password}
                                </small>
                            )}


                            <div className='fixed-bottom text-center mb-5'>
                                <button  type='submit' className='btn btn-dark'>
                                    Guardar
                                    <span className='mr-3'><SaveIcon/></span>
                                </button>
                            </div>
                        </form>}
                </Box>
            </Modal>
        </>
    )
}