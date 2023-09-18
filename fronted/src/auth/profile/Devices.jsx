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

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:500,
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



export default function DevicesUser(props){
    const {devices,setDevice} = props
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    return(
        <>
            <button onClick={handleOpen}>
                <VisibilityIcon/>
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
                        {devices.length !=0 ?(
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
                                        <Table>
                                            <TableBody>
                                        {devices.map(device => (

                                                        <StyledTableRow key={device.id}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {device.info}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                               <DeleteSession
                                                                   session_id={device.id}
                                                                   setLoading={setLoading}
                                                                   setDevice={setDevice}
                                                                   devices={devices}
                                                               />
                                                                </StyledTableCell>
                                                    </StyledTableRow>
                                        ))}
                                            </TableBody>

                                        </Table>


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
    const {session_id,setLoading,setDevice,devices} = props
    const navigate = useNavigate()
    const delete_session = async () =>{
        try {
            setLoading(true)

            const res = await profileApi.delete(`/delete_session/${session_id}`,  {
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }
            })
            setLoading(false)
            show_alert_warning(res.data.msg)
            setDevice(devices.filter(token => token.id != session_id))
        }
        catch (e){
            handleResponse(e,navigate,null)
        }
    }


    return(
        <div onClick={delete_session}>

            <PhonelinkEraseIcon/>
        </div>

    )
}