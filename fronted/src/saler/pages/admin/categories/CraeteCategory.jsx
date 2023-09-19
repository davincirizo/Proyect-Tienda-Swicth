import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import {PulseLoader } from "react-spinners";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import storage from "../../../../storage/Storage.jsx";
import {categoryApi} from "../../../../apis/QueryAxios.jsx";
import {useNavigate} from "react-router-dom";
import {handleResponse} from "../../../../general/HandleResponse.jsx";




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
export default function CreateCategory (props){
    const {enviarMessage,categories,setCategories} = props
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors([])
        setValue("name",'')
    }
    const [errors,setErrors] = useState([]);
    const { register, handleSubmit,setValue } = useForm()

    const create_category = async (data) =>{
        const token = storage.get('authToken')
        setErrors([])
        // try{
            setLoading(true)
            const res = categoryApi.post('',{
                name:data.name,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
            res.then((data) => {
                setLoading(false)
                handleClose()
                setCategories([...categories,data.data.category])
                enviarMessage(data.data.msg)
            })
                .catch(error => {
                    setLoading(false)
                    handleResponse(error,navigate,setErrors)
                })
        }

    return(
        <>

            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
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
                        <form  onSubmit={handleSubmit(create_category)} >

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><DisplaySettingsIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Nombre' type="text" {...register('name')}/>
                            </div>
                            {errors.name &&(
                                <small className='fail'>
                                    {errors.name}
                                </small>
                            )}


                            <div className='fixed-bottom text-center mb-5'>
                                <button  type='submit' className='btn btn-dark'>
                                    Crear Categoria
                                    <span className='mr-3'><AddBoxIcon/></span>
                                </button>
                            </div>

                        </form>}
                </Box>

            </Modal>


        </>
    )
}