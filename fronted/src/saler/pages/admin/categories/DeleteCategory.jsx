import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Button from "@mui/material/Button";
import { categoryApi } from '../../../../apis/QueryAxios.jsx';
import {useEffect, useState} from 'react';
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import {useNavigate} from "react-router-dom";






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
    const {category,getAllCategory,enviarMessage,categories,setCategories} = props
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const delete_category = async () =>{
        const token = storage.get('authToken')
        try{
            setLoading(true)
            const res = await categoryApi.delete(`/${category.id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLoading(false)
            setCategories(categories.filter(category_filter => category_filter.id != category.id))
            handleClose()
            enviarMessage(res.data.msg)
        }
        catch(e){
            setLoading(false)
            handleResponse(e,navigate,null,handleClose,getAllCategory)
     
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