import NavBarUser from "../../user/general/NavBarUser.jsx";
import Typography from "@mui/material/Typography";
import {ToastContainer} from "react-toastify";

export default function Page403() {
    document.title = 'Fordibben';
    return(
        <>
            <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',}} >
                <h1 className='text-center'>403 - Prohibido</h1>
                <p>No tiene suficientes Permisos.</p>
            </Typography>
            <ToastContainer/>

        </>
    )


}