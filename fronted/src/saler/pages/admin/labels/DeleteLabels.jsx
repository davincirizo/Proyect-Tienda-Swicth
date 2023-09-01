import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Button from "@mui/material/Button";
import {labelsApi} from '../../../../apis/QueryAxios.jsx';
import { useState } from 'react';
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
export default function DeleteLabels (props){
    const {label,getAllLabels,enviarMessage,setLabels,labels} = props
    const  navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const delete_labels = async () =>{
        const token = storage.get('authToken')
        try{
            setLoading(true)
            const res = await labelsApi.delete(`/${label.id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLoading(false)
            handleClose()
            setLabels(labels.filter(label_filter => label_filter.id != label.id))
            enviarMessage(res.data.msg)
        }
        catch(e){
            setLoading(false)
            handleResponse(e,navigate,null,handleClose,getAllLabels)
        }}

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
                                Esta seguro que desea eliminar la etiqueta : {label.name}
                            </div>


                            <div className='text-center'>
                                <Button  onClick={delete_labels}>
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