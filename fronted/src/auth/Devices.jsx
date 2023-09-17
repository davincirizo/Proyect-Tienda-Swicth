import VisibilityIcon from "@mui/icons-material/Visibility.js";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import NotFound from "../general/NotFound.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase.js";

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
    const {devices} = props
    const [open, setOpen] = React.useState(false)
    console.log(devices)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const delete_session = async()=>{

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
                                                                <div onClick={delete_session}>
                                                                    <PhonelinkEraseIcon/>
                                                                </div>
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
                    </div>
                </Box>
            </Modal>
        </>
    )
}