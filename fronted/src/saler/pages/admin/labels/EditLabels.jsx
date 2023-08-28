import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form"
import {useEffect, useState} from 'react';
import {PulseLoader } from "react-spinners";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import storage from "../../../../storage/Storage.jsx";
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import StyleIcon from '@mui/icons-material/Style';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {categoryApi, labelsApi} from "../../../../apis/QueryAxios.jsx";
import {useNavigate} from "react-router-dom";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import EditIcon from '@mui/icons-material/Edit';




const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    height:350,
    bgcolor: '#858585',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function EditLabels (props){
    const {label,getAllLabels,enviarMessage,categories,setLabels,labels} = props

    const [category,setcategory] = useState('')
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => {
        setValue("name",label.name)
        setcategory(label.category.id)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        setErrors([])
    }
    const [errors,setErrors] = useState([]);
    const { register, handleSubmit,setValue } = useForm()

    const edit_label = async (data) =>{
        const token = storage.get('authToken')
        setErrors([])
        // try{
        setLoading(true)
        const res = labelsApi.put(`/${label.id}`,{
            name:data.name,
            category_id:category
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        res.then((data) => {
            setLoading(false)
            setLabels([...labels.filter(label_filter => label_filter.id != label.id),data.data.label])
            console.log()
            handleClose()
            enviarMessage(data.data.msg)
        })
            .catch(error => {
                setLoading(false)

                if(error.response.status == 400) {
                    setErrors(error.response.data.errors)
                }
                if(error.response.status == 404) {
                    setOpen(false)
                    show_alert_danger(error.message)
                    getAllLabels()
                }
                else {
                    setOpen(false)
                    show_alert_danger(error.response.data.msg)
                }
            })
    }


    const setCategory = (event,value) =>{
        setcategory(value.id)
    }


    return(
        <>

            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
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
                                top:'50%',
                                transform: 'translateX(-50%)'}}>

                                <PulseLoader

                                    size={40}
                                    color="#1C0E74"
                                />
                            </div>
                        ):
                        <form  onSubmit={handleSubmit(edit_label)} >

                            <div className='input-group mt-3'>
                                <span className='input-group-text'><StyleIcon/></span>
                                <input className='form-control bg-light text-dark' placeholder='Nombre' type="text" {...register('name')}/>
                            </div>
                            {errors.name &&(
                                <small className='fail'>
                                    {errors.name}
                                </small>
                            )}


                            <div className='input-group mt-3'>
                                <Autocomplete
                                    onChange={setCategory}
                                    defaultValue={label.category}
                                    disablePortal
                                    id="disable-close-on-select"
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    sx={{ width: 320,height:10 }}
                                    renderInput={(params) =>  <span className='input-group-text'><DisplaySettingsIcon/><TextField className='form-control bg-light text-dark' {...params} label="Categorias" variant="standard"></TextField></span>}
                                />
                            </div>
                            <div style={{marginTop:'55px'}}>
                                {errors.category_id &&(
                                    <small className='fail'>
                                        {errors.category_id}
                                    </small>
                                )}
                            </div>



                            <div className='fixed-bottom text-center mb-5'>
                                <button  type='submit' className='btn btn-dark'>
                                    Editar
                                    <span className='mr-3'><EditIcon/></span>
                                </button>
                            </div>

                        </form>}
                </Box>

            </Modal>


        </>
    )
}
