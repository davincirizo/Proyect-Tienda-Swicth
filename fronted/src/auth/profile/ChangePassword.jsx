import VisibilityIcon from "@mui/icons-material/Visibility.js";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import NotFound from "../../general/NotFound.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase.js";
import {useNavigate} from "react-router-dom";
import {profileApi, usersApi} from "../../apis/QueryAxios.jsx";
import storage from "../../storage/Storage.jsx";
import {handleResponse} from "../../general/HandleResponse.jsx";
import {useState} from "react";
import {PulseLoader} from "react-spinners";
import {show_alert_warning} from "../../general/notifications/ShowAlert.jsx";
import {notification_succes} from "../../general/notifications/NotificationTostify.jsx";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import VpnKeyIcon from "@mui/icons-material/VpnKey.js";
import {useForm} from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save.js";


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:350,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,

    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#063970",
        color: theme.palette.common.white,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        backgroundColor: "#a8a8a8",
    },
}));
export default function ChangePassword(props){
    const {user} = props
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit,setValue } = useForm()

    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const change_password = async (data) =>{
            try{
                setLoading(true)
                const res = await profileApi.put('')
            }
            catch(e){

            }
    }


    return(
        <>
            <button onClick={handleOpen}>
                <ChangeCircleIcon/>
            </button>
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
                        <div>
                            <form onSubmit={handleSubmit(change_password)}>
                                <div className='input-group mt-3'>
                                    <span className='input-group-text'><VpnKeyIcon/></span>
                                    <input className='form-control bg-light text-dark'  placeholder='Currently Password'   type="password" {...register('last_password')}/>
                                </div>
                                <div className='input-group mt-3'>
                                    <span className='input-group-text'><VpnKeyIcon/></span>
                                    <input className='form-control bg-light text-dark'  placeholder='New Password'  type="password" {...register('password')}/>
                                </div>
                                <div className='input-group mt-3'>
                                    <span className='input-group-text'><VpnKeyIcon/></span>
                                    <input className='form-control bg-light text-dark'  placeholder='Confirm Password'   type="password" {...register('password_confirm')}/>
                                </div>
                                <div className='fixed-bottom text-center mb-5'>
                                    <button  type='submit' className='btn btn-dark'>
                                        <span className='mr-3'><SaveIcon/></span>
                                    </button>
                                </div>
                            </form>

                        </div>}
                </Box>
            </Modal>
        </>
    )
}
