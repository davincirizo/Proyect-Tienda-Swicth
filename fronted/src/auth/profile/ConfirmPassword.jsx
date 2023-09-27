
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
import {show_alert_danger, show_alert_warning} from "../../general/notifications/ShowAlert.jsx";
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
    height:240,
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
export default function ConfirmPassword(props){
    const {function_} = props
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm()
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate()
    const [password,setpassword] = useState('')
    const [error_auth,seterror_auth] = useState('')

    const clear_dashboard=()=>{
        setpassword('')
    }
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }
    const handleClose = () => {
        setErrors([])
        seterror_auth('')
        clear_dashboard()
        setOpen(false)
    }

    const confirm_password = async (data) =>{
        setErrors([])
        setLoading(true)
        try{
            setLoading(true)
            const res = await profileApi.put(`confirm_password/${storage.get('authUser').id}`,{
                password:password,

            }, {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            setLoading(false)
            handleClose()
            function_()

        }
        catch(e){
            setLoading(false)
            if(e.response.data.errors) {
                handleResponse(e, navigate, setErrors)
            }
            else{
                seterror_auth(e.response.data.msg)
            }
        }
    }


    return(
        <>
            <button onClick={handleOpen}>
                Cambiar Email
                <ChangeCircleIcon

                />
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
                        <div >
                            <form>
                                <div className='input-group mt-3'>
                                    <span className='input-group-text'><VpnKeyIcon/></span>
                                    <input value={password} className='form-control bg-light text-dark'  placeholder='Password'  type="password" onChange={(e)=>setpassword(e.target.value)} />
                                </div>
                                {errors.password &&(
                                    <small className='fail'>
                                        {errors.password}
                                    </small>
                                )}
                                {error_auth &&(
                                    <small className='fail'>
                                        {error_auth}
                                    </small>
                                )}
                                <div className='fixed-bottom text-center mb-5'>
                                    <button onClick={confirm_password} className='btn btn-dark'>
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
