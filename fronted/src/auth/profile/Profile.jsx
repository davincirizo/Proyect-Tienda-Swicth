import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail.js";
import storage from "../../storage/Storage.jsx";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ContactsIcon from "@mui/icons-material/Contacts.js";
import {useForm} from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Chip from "@mui/material/Chip";
import {profileApi} from "../../apis/QueryAxios.jsx";
import {useState} from "react";
import {handleResponse} from "../../general/HandleResponse.jsx";
import {useNavigate} from "react-router-dom";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import List from "@mui/material/List";
import DevicesUser from "./Devices.jsx";
import {PulseLoader} from "react-spinners";
import {ToastContainer} from "react-toastify";
import {notification_succes} from "../../general/notifications/NotificationTostify.jsx";
import ChangePassword from "./ChangePassword.jsx";

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:700,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function Profile (props){
    const {handleMenuClose} = props
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [devices,setDevice] = useState([])
    const user = storage.get('authUser')
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit,setValue } = useForm()
    const [errors,setErrors] = useState([]);


    const handleOpen = () => {
        handleMenuClose()
        setOpen(true)
        get_devices()
        setValue("name",user.name)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const edit_user = async (data) =>{
        setLoading(true)
        try {
            const res = await profileApi.put(`/update/${user.id}`, {
                name: data.name
            }, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            storage.set('authUser',res.data.user);
            setErrors([])
            setLoading(false)
            notification_succes(res.data.msg)
        }
        catch (e){
            setLoading(false)
            handleResponse(e,navigate,setErrors)
        }
    }

    const get_devices = async () => {
        try {
            setLoading(true)
            const res = await profileApi.get(`/getDevices/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                },
            })
            setLoading(false)
            setDevice(res.data.devices)
            console.log(res.data.devices)
        }
        catch (e){
            setLoading(false)
            handleResponse(e,navigate,null,handleClose,null)
        }
    }

return(
    <>
       <MenuItem onClick={handleOpen}>
           Perfil
       </MenuItem>
        {user?(
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                {loading ? (<div style={{
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
                    ):
                <form onSubmit={handleSubmit(edit_user)}>
                    <div className='input-group mt-3'>
                        <span className='input-group-text'><SupervisedUserCircleIcon/></span>
                        {user.roles.map((role) => (
                            <span className='form-control bg-light text-dark' key={role.id}>
                                <Chip color="primary" label={role.name} />

                        </span>))}
                    </div>
                    <div className='input-group mt-3'>
                        <div className='input-group'>
                            <span className='input-group-text'><ContactsIcon/></span>
                            <input  className='form-control bg-light text-dark' placeholder='Nombre' type="text" {...register('name')}/>
                        </div>
                        {errors.name &&(
                            <small className='fail'>
                                {errors.name}
                            </small>
                        )}
                        <div className='input-group mt-4'>
                            <span className='input-group-text'><MailIcon/></span>
                            <span className='form-control bg-light text-dark'>
                                {user.email}
                            </span>
                            <ChangePassword
                                user={user}
                            />
                        </div>
                    </div>
                    <div className='input-group mt-3'>
                        <span className='input-group-text'><LaptopWindowsIcon/></span>
                        <span className='form-control bg-light text-dark'>
                               Dispositivos
                        </span>
                        <DevicesUser
                            devices={devices}
                            setDevice={setDevice}
                        />
                    </div>



                    <div className='fixed-bottom text-center mb-5'>
                        <button  type='submit' className='btn btn-dark'>
                            <span className='mr-3'><SaveIcon/></span>
                        </button>
                    </div>
                </form>}

            </Box>
        </Modal>):<div></div>}
        <ToastContainer/>
    </>
)

}
