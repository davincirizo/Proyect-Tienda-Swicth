import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useForm} from "react-hook-form";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import SaveIcon from "@mui/icons-material/Save.js";
import Typography from "@mui/material/Typography";
import {permissionsApi, roleApi} from "../../../../apis/QueryAxios.jsx";
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import {useNavigate} from "react-router-dom";
import {PulseLoader} from "react-spinners";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import TravelExploreIcon from "@mui/icons-material/TravelExplore.js";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add.js";


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height:800,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
function CreateRole(props) {
    const {enviarMessage,getAllRoles} = props
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const { register, handleSubmit,setValue } = useForm()
    const [allpermissions,setPermissions] = useState([])
    const [filter_permissions,setFilter_permissions] = useState([])
    const [modelsPermissions,setModelsPermissions] = useState([])
    const [permissionsSelected,setPermissionsSelected] = useState([])
    const navigate = useNavigate()
    const[search,setSearch] = useState("")

    const handleOpen = () => {
        setOpen(true)

    };
    const handleClose = () => {
        setOpen(false)
        setErrors([])
        setValue("name",'')
        setPermissionsSelected([])
    }
    const create_role = async (data) =>{
        const token = storage.get('authToken')
        try{
            setLoading(true)
            const res = await roleApi.post('',{
                name:data.name,
                permissions:permissionsSelected
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLoading(false)
            handleClose()
            getAllRoles()
            enviarMessage(res.data.msg)
        }
        catch (e){
            setLoading(false)

            if(e.response.status == 400) {
                setErrors(e.response.data.errors)
                console.log(e.response.data.errors)
            }
            else {
                setOpen(false)
                show_alert_danger(e.response.data.msg)
            }

        }
    }

    const getAll_permission = async () => {
        try {
            setLoading(true)
            const token = storage.get('authToken')
            const response = await permissionsApi.get('', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPermissions(response.data.permission)
            setFilter_permissions(response.data.permission)
            setModelsPermissions(response.data.models)
            setLoading(false)

        }
        catch(e){
            setLoading(false)
            show_alert_danger(e.response.data.msg)
            navigate('/')
        }
    }

    const checkBoxRole =  (e)=>{
        const {value,checked} = e.target
        if(checked){
            setPermissionsSelected([...permissionsSelected,value])
        }
        else{
            setPermissionsSelected(permissionsSelected.filter(o=> o!=value))
        }
        console.log(permissionsSelected)
    }
    const searcher =  (e) => {
        setSearch(e.target.value)
        const value = e.target.value
        const permissions_filtered = allpermissions.filter((dato) =>
            dato.description.toLowerCase().includes(value.toLocaleLowerCase())
        )
        setFilter_permissions(permissions_filtered)
        console.log(filter_permissions)
    }

    useEffect (() =>{
        getAll_permission()
    },[])

    return (
        <>
            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
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
                        <form  onSubmit={handleSubmit(create_role)} >
                            <div className='input-group mt-3'>
                                <span className='input-group-text'><SupervisedUserCircleIcon/></span>
                                <input className='form-control bg-light text-dark'  placeholder='Nombre' type="text"  {...register('name')}/>
                            </div>
                            {errors.name &&(
                                <small className='fail'>
                                    {errors.name}
                                </small>
                            )}
                            <Typography style={{fontWeight: 'bold'}} sx={{
                                left: 230,
                                marginTop: 4,
                                position: 'relative',
                            }}>
                                Seleccionar Permisos
                            </Typography>
                            <Divider variant="middle" style={{width: '80%'}} />
                            <div className='buscador_px'>
                                <input className='form-control w-50 bg-light text-dark' type='text' placeholder='Buscar permiso' onChange={searcher} value={search} />
                                <TravelExploreIcon className="icon" />
                            </div>

                            {filter_permissions.length != 0 ?
                                (<List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 300,

                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 420,
                                        fontWeight: 'bold',
                                        left: 230,
                                        marginTop: 2,
                                        '& ul': { padding: 0 },
                                    }}
                                    subheader={<li />}
                                >
                                    {modelsPermissions.map((model) => (
                                        <li style={{}} key={{model}}>
                                            <ul>
                                                <ListSubheader
                                                    sx={{
                                                        bgcolor: '#858585',
                                                    }}
                                                >
                                                    <Typography sx={{fontStyle: 'calibri',
                                                        fontWeight: 'bold'}}>
                                                        {model}
                                                    </Typography>
                                                </ListSubheader>
                                                {filter_permissions.map((permission) => (
                                                    permission.models == model ?
                                                        (<div key={permission.id} >
                                                            {permission.description}
                                                            <Checkbox
                                                                value={permission.id}
                                                                onChange={checkBoxRole}
                                                            />
                                                        </div>):null

                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </List>):
                                <div>
                                    No Found
                                </div>}

                            {errors.permissions &&(
                                <small className='fail'>
                                    {errors.permissions}
                                </small>
                            )}


                            <div className='fixed-bottom text-center mb-5'>
                                <button type='submit' className='btn btn-dark'>
                                    Guardar
                                    <span className='mr-3'><SaveIcon/></span>
                                </button>
                            </div>

                        </form>}
                </Box>
            </Modal>
        </>
    )
}

export default CreateRole