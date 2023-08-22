import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import axios from "axios"
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { usersApi } from '../../../../apis/QueryAxios.jsx';


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
export default function EditUser (props) {
    const {user} = props
    const {getAllUser} = props
    const {enviarMessage} = props

    const [role_user,setRoleUser] = useState([])

    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        const roleIds = role_user.map(role => role.id);
        // role_user.map(role => {
        setRoleSelect(roleIds);
        // });
        console.log(role_select)
    }
    const handleClose = () => {
        setOpen(false)
        setRoleSelect([])
    }
    const url = import.meta.env.VITE_BACKEND_URL

    const [role_select,setRoleSelect] = useState([])
    const {register, handleSubmit} = useForm()
    const [roles,setRoles] = useState([])
    const edit_user = async (data) => {
        const token = storage.get('authToken')
        try {
            setLoading(true)
            const res = await usersApi.put(`/${user.id}`,{
                roles: role_select,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            })
            setLoading(false)
            handleClose()
            getAllUser()
            enviarMessage(res.data.msg)

        } catch (e) {
            setLoading(false)
            setOpen(false)
            show_alert_danger(e.response.data.msg)

        }
    }

    const get_all_roles = async (data) =>{
        const token = storage.get('authToken')
        try {
            const res = await axios.get(`${url}/admin/roles`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setRoles(res.data)
        } catch (e) {
            show_alert_danger(e.response.data.msg)
        }
    }
    useEffect (() =>{
        get_all_roles()
        setRoleUser(user.roles)
    },[])

    const checkBoxRole =  (e)=>{
        const {value,checked} = e.target
        if(checked){
            setRoleSelect([...role_select,value])
        }
        else{
            setRoleSelect(role_select.filter(o=> o!=value))
        }
        console.log(role_select)
    }
    return (
        <>

            <Box onClick={handleOpen} sx={{'& > :not(style)': {m: 1}}}>
                <EditCalendarRoundedIcon/>
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
                        <form onSubmit={handleSubmit(edit_user)}>

                            <Typography variant="h8" align="center" style={{fontWeight: 'bold'}}>
                                Seleccionar Roles
                                <Divider variant="middle" style={{width: '15%'}} />
                            {roles.map(rol=>(
                                <div key={rol.id} style={{display: "inline-block"}}>
                                    {rol.name}
                                    <Checkbox
                                        value={rol.id}
                                        onChange={checkBoxRole}
                                        defaultChecked={role_user.map(r => r.id).includes(rol.id) }
                                    />
                                </div>

                            ))}

                            <div className='fixed-bottom text-center mb-5'>
                                <button type='submit' className='btn btn-dark'>
                                    Guardar
                                    <span className='mr-3'><SaveIcon/></span>
                                </button>
                            </div>
                            </Typography>
                        </form>}

                </Box>

            </Modal>


        </>
    )
}