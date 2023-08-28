import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { usersApi } from '../../../../apis/QueryAxios.jsx';
import InputIcon from '@mui/icons-material/Input';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Avatar from '@mui/material/Avatar';
import ListSubheader from "@mui/material/ListSubheader";
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import NotFound from "../../../../general/NotFound.jsx";
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import {ToastContainer} from "react-toastify";

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:500,
    bgcolor: '#8092d7',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};



export default function SessionsUser (props) {
    const {user} = props
    const {getAllUser} = props
    const {enviarMessage} = props


    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const sendnotification = (msg) =>{
        notification_succes(msg)
    }



    return (
        <>

            <Box onClick={handleOpen} sx={{'& > :not(style)': {m: 1}}}>
                <InputIcon/>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}>

                <Box sx={style}>
                    {loading ? (
                            <div style={{
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
                        ) :
                        <div>
                            {user.tokens.length !=0 ?(
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 600,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    top: '50px',

                                }}>
                                <ul>
                                    {user.tokens.map(session => (
                                        <ListItem key={session.id}>
                                            <div>
                                                <LaptopWindowsIcon/>
                                            </div>
                                            <div style={{marginLeft:'10px'}}>
                                                {session.info}
                                            </div>

                                            <div  style={{marginLeft:'10px'}}>
                                                <DeleteSession
                                                session_id={session.id}
                                                user={user}
                                                sendnotification={sendnotification}
                                                handleClose={handleClose}
                                                setLoading={setLoading}
                                                />
                                            </div>
                                        </ListItem>
                                    ))}
                                </ul>
                            </List>):
                                <div style={{marginLeft:'210px',marginTop:'150px'}}>
                                    <NotFound/>
                                </div>}
                        </div>}

                </Box>

            </Modal>


        </>
    )
}
function DeleteSession (props){
    const {session_id,user,sendnotification,handleClose,setLoading} = props

    const delete_session = async () =>{
        try {
            setLoading(true)

            const res = await usersApi.put(`/${user.id}`, {
                token_id: session_id
            }, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            setLoading(false)
            handleClose()
            sendnotification(res.data.msg)
            user.tokens  = user.tokens.filter(token => token.id != session_id);
        }
        catch (e){
            setLoading(false)
            handleClose()
            show_alert_danger(e.response.data.msg)
        }
    }


    return(
        <div onClick={delete_session}>

        <PhonelinkEraseIcon/>
        </div>

    )
}