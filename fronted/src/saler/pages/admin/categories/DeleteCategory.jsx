import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Button from "@mui/material/Button";





const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    height:150,
    bgcolor: '#ead4b0',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function DeleteCategory (props){
    const {category} = props
    const {getAllCategory} = props
    const {enviarMessage} = props
    // const[message,Setmessage] = useState("")

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setErrors([])
    }
    const [errors,setErrors] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL
    const { register, handleSubmit,setValue } = useForm()
    useEffect (() =>{
        setValue("name",category.name)
    },[])

    const delete_category = async (data) =>{
        const token = storage.get('authToken')
        setErrors([])
        try{
            setLoading(true)
            const res = await axios.delete(`${url}/admin/categories/${category.id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setLoading(false)
            setOpen(false)
            getAllCategory()
            enviarMessage(res.data.msg)
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

            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <DeleteSweepIcon/>
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

                        <div>
                            <div>
                                Esta seguro que desea eliminar la categoria : {category.name}
                            </div>


                            <div className='text-center'>
                                <Button  onClick={delete_category}>
                                    SI
                                </Button>
                                <Button  onClick={handleClose}>
                                    NO
                                </Button>
                            </div>
                        </div>}



                </Box>

            </Modal>


        </>
    )
}