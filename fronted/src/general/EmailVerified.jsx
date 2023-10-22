
import Typography from "@mui/material/Typography";
import {ToastContainer} from "react-toastify";
import NavBarUser from "../user/general/NavBarUser.jsx";

export default function EmaiVerifieed() {
    document.title = 'Email Verified';
    return (
        <>
            <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',
            }}>
                <h1 className='text-center'>200 Ok</h1>
                <p>Correo verificado exitosamente</p>
            </Typography>
            <ToastContainer/>


        </>
    )

}