import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import { show_alert } from '../general/notifications/ShowAlert';
import { useState } from 'react';
import './css/register.css'
import ContactsIcon from '@mui/icons-material/Contacts';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 390,
  height:420,
  bgcolor: '#858585',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, 
  borderRadius: '8px' ,
};

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)

  }

  const url = import.meta.env.VITE_BACKEND_URL
  const { register, handleSubmit } = useForm()
  const [errors,setErrors] = useState([]);


  const register_user = async (data) =>{
    try{
    const res = await axios.post(`${url}/register`,{
      email:data.email,
      name:data.name,     
      password:data.password,     
      confirm_password:data.confirm_password}
  )
    setOpen(false)  
    show_alert(res.data.msg)

            }
  catch(e){
    setErrors(e.response.data.errors)
  }
  }

  return (
    <div>
      <Button onClick={handleOpen}>REGISTER</Button>
      <Modal
        open={open}
        onClose={handleClose}
      
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(register_user)} >
          

            <div className='input-group'>
                <span className='input-group-text'><ContactsIcon/></span>
                <input  className='form-control bg-light text-dark' placeholder='Nombre' type="text" {...register('name')}/>
            </div>
                
            {errors.name &&(
                <small className='mt-10'>
                {errors.name}
                </small>
                  )}
           
          
         
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
            <div className='input-group mt-3'>
              <span className='input-group-text'><VpnKeyIcon/></span>
              <input className='form-control bg-light text-dark' placeholder='Confirma tu contraseña' type="password" {...register('confirm_password')}/>
            </div>
            {errors.confirm_password &&(
                <small className='fail'>

                {errors.confirm_password}
                </small>
          
                  )}
                
                
            <div className='fixed-bottom text-center mb-5'>
              <button  type='submit' className='btn btn-dark'>
                Registrar
              <span><AppRegistrationIcon/></span>

              </button>

            </div>
         
            
            
 
          </form>

        </Box>
      </Modal>
    </div>
  );
}
