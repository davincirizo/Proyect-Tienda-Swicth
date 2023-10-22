import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import {PulseLoader } from "react-spinners";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import storage from "../../../../storage/Storage.jsx";
import {useNavigate} from "react-router-dom";
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import {Avatar} from "@mui/material";
import {companyApi, profileApi} from "../../../../apis/QueryAxios.jsx";
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import AssignUser from "./AssignUser.jsx";
import Button from "@mui/material/Button";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';




const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:800,
    bgcolor: '#858585',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function EditCompany (props){
    const {companies,setCompanies,users,company,type_request} = props
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [url_file,setURL_File] = useState(null)
    const [file,setFile] = useState(null)
    const [file_name,setfileName] = useState('')
    const [usersAssigned,setusersAssigned] = useState([])
    const backend = import.meta.env.VITE_BACKEND_URL_native

    const handleOpen = () => {
        setOpen(true)
        setValue("name",company.name)
        setValue("description",company.description)
        console.log(company)
        if(company.image){
            setURL_File(`${backend}/storage/${company.image}`)
        }
        if(company.users.length){
            setusersAssigned(company.users.map(r => r.id))
        }

    }
    const handleClose = () => {
        setOpen(false)
        setErrors([])
    }
    const { register, handleSubmit,setValue } = useForm()

    const Changeimage = async (e) =>{
        const file = e
        let url = URL.createObjectURL(file)
        setFile(e)
        setURL_File(url)
        setfileName(e.name)
    }

    const edit_company = async (data) =>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', file);
        formData.append('users', JSON.stringify(usersAssigned));
        setErrors([])
        setLoading(true)
        let res;
        try {
            if(type_request === 'companies') {
                 res = await companyApi.post(`${company.id}?_method=PUT`, formData, {
                    headers: {
                        'Authorization': `Bearer ${storage.get('authToken')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            if(type_request === 'companies_users') {
                 res = await profileApi.post(`companies/${company.id}?_method=PUT`, formData, {
                    headers: {
                        'Authorization': `Bearer ${storage.get('authToken')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
            setLoading(false)
            handleClose()
            setCompanies([...companies.filter(comp => comp.id != company.id), res.data.company])
            notification_succes(res.data.msg)
        }
        catch(e){
            setLoading(false)
            handleResponse(e,navigate,setErrors)
        }
    }

    return(
        <>

            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <Button variant="contained" endIcon={<DriveFileRenameOutlineIcon/>}>
                    EDIT
                </Button>
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
                        <form  onSubmit={handleSubmit(edit_company)} >

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><DisplaySettingsIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Nombre' type="text" {...register('name')}/>
                            </div>
                            {errors.name &&(
                                <small className='fail'>
                                    {errors.name}
                                </small>
                            )}
                            <div className='mt-3 mb-3'>
                                <textarea className='form-control bg-light text-dark' rows="5" placeholder='Descripcion' {...register('description')}/>
                            </div>
                            <div className='mt-3 mb-3'>
                                <label className='form-label'>
                                    <strong>
                                        Logo Company
                                    </strong>
                                </label>
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
                                    sx={{
                                        minWidth: 300,
                                        maxWidth: 600,
                                        minHeight: 200,
                                        maxHeight: 400,
                                        top: '30px', }}
                                    variant="square"
                                />
                                <Box sx={{marginTop: 4}}>
                                    <AssignUser
                                        users={users}
                                        setusersAssigned={setusersAssigned}
                                        usersAssigned={usersAssigned}
                                    />
                                </Box>
                            </div>




                            <div className='fixed-bottom text-center mb-5'>
                                <Button type='submit' variant="contained" endIcon={<AddBoxIcon/>}>
                                    EDIT COMPANY
                                </Button>
                            </div>

                        </form>}
                </Box>

            </Modal>


        </>
    )
}