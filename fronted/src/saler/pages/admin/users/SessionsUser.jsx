import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import { usersApi } from '../../../../apis/QueryAxios.jsx';
import InputIcon from '@mui/icons-material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import NotFound from "../../../../general/NotFound.jsx";
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import {useNavigate} from "react-router-dom";
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import axios from "axios";

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
    const {user,getAllUser} = props

    const [tokens,setTokens] = useState([])

    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleOpen = () => {
        setOpen(true)
        show_sessions()
    }
    const handleClose = () => {
        setOpen(false)
    }

    const sendnotification = (msg) =>{
        notification_succes(msg)
    }

    const show_sessions = async () =>{
        try{
            setLoading(true)
            const res = await usersApi.get(`/show_tokens/${user.id}`,{
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            setLoading(false)
            setTokens(res.data.tokens)
            console.log(res)
        }
        catch (e){
            handleResponse(e,navigate,null,handleClose,getAllUser)
        }
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
                            {tokens.length !=0 ?(
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
                                    {tokens.map(session => (
                                        <ListItem key={session.id}>
                                            <div>
                                                <LaptopWindowsIcon/>
                                            </div>
                                            <div style={{marginLeft:'10px'}}>
                                                {session.info}
                                            </div>

                                            <div  style={{marginLeft:'10px'}}>
                                                {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.users.delete_token')) ?
                                                   ( <DeleteSession
                                                    session_id={session.id}
                                                    user={user}
                                                    sendnotification={sendnotification}
                                                    handleClose={handleClose}
                                                    setLoading={setLoading}
                                                    getAllUser={getAllUser}
                                                    />):null}
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
    const {session_id,user,sendnotification,handleClose,setLoading,getAllUser} = props
    const navigate = useNavigate()
    const delete_session = async () =>{
        try {
            setLoading(true)

            const res = await usersApi.delete(`/delete_token/${session_id}`,  {
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
            console.log(e)
            setLoading(false)
            handleResponse(e,navigate,null,handleClose,getAllUser)
        }
    }


    return(
        <div onClick={delete_session}>

        <PhonelinkEraseIcon/>
        </div>

    )
}

