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
import LockIcon from '@mui/icons-material/Lock';
import {Avatar} from "@mui/material";
import ConfirmPassword from "./ConfirmPassword.jsx";

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
    const [file_name,setfileName] = useState('')
    const [url_file,setURL_File] = useState(null)
    const [file,setFile] = useState(null)
    const [email,setEmail] = useState('')
    const backend = import.meta.env.VITE_BACKEND_URL_native
    const [error_change_email,setError_change_email] =  useState('')



    const clear_dashboard=()=>{
        setFile(null)
        setURL_File(null)
        setfileName(null)
        setError_change_email('')
    }
    const handleOpen = () => {
        handleMenuClose()
        setOpen(true)
        get_devices()
        setValue("name",user.name)
        setEmail(user.email)
        if(storage.get('authUser').image){
            setURL_File(`${backend}/storage/${storage.get('authUser').image}`)
        }
    }
    const handleClose = () => {
        setOpen(false)
        clear_dashboard()
    }

    const Changeimage = async (e) =>{
        const file = e
        let url = URL.createObjectURL(file)
        setFile(e)
        setURL_File(url)
        setfileName(e.name)
    }

    const edit_user = async (data) =>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', file);
        setLoading(true)
        try {
            const res = await profileApi.post(`/update/${user.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`,
                    'Content-Type':"multipart/form-data"
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
        }
        catch (e){
            setLoading(false)
            handleResponse(e,navigate,null)
        }
    }

    const change_email = async  ()=>{

        try {
            setLoading(true)
            const res = await profileApi.post(`/request_change_email/${user.id}`, {
                email:email
            },{
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                },
            })
            setLoading(false)
            notification_succes(res.data.msg)
        }
        catch (e){
            setLoading(false)
            if(e.response.data.errors) {
                handleResponse(e,navigate,null)
            }
            else{
                setError_change_email(e.response.data.msg)
            }
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
                            <input className='form-control bg-light text-dark' value={email} onChange={(e)=>setEmail(e.target.value)}/>

                            <ConfirmPassword
                                function_={change_email}
                            />
                        </div>
                        {error_change_email &&(
                            <small className='fail'>
                                {error_change_email}
                            </small>
                        )}
                        <div>
                            <div className='input-group mt-4'>
                                    <span className='input-group-text'><LockIcon/></span>
                                    <ChangePassword
                                        user={user}
                                    />
                            </div>
                            <div className='input-group mt-4'>
                                <span className='input-group-text ml-1'><LaptopWindowsIcon/></span>
                                <DevicesUser
                                    devices={devices}
                                    setDevice={setDevice}
                                />
                            </div>
                        </div>

                        <div className='mt-3 m-b3'>
                            <label className='form-label'>Perfil Photo</label>
                            <input
                                name='file'
                                onChange={(e)=>Changeimage(e.target.files[0])}
                                type='file'
                                className='form-control'
                                accept="image/*"
                            />

                            <Avatar
                                alt="Remy Sharp"
                                src={url_file}
                                sx={{ width: 100, height: 100 }}
                            />

                        </div>
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
