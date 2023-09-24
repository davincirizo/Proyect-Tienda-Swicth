import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {styled} from "@mui/material/styles";
import { usersApi } from '../../../../apis/QueryAxios.jsx';
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

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function ActiveUser (props){
    const {user,getAllUser,enviarMessage,setUser,users} = props
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const active_user = async (data) =>{
        const token = storage.get('authToken')

        try{
            setLoading(true)
            const res = await usersApi.put(`/active_user/${user.id}`,{
                active:user.active,
                },{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }) 
            setLoading(false)
            handleClose()
            setUser([...users.filter(user_filter => user_filter.id != user.id), res.data.user])
            enviarMessage(res.data.msg)
        }
        catch(e){
           handleResponse(e,navigate,null,handleClose,getAllUser)
            }
        }




    return(
        <>
            <FormControlLabel
                onClick={handleOpen}
                control={<IOSSwitch sx={{ m: 1 }} checked={user.active} />}
            />

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
                            {user.active ? (
                            <div>
                                Esta seguro que desea desactivar el usuario : {user.name}
                            </div>):
                            <div>
                                Esta seguro que desea activar el usuario : {user.name}
                            </div>
                            }

                            <div className='text-center'>
                                <Button  onClick={active_user}>
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