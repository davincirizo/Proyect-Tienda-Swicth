import NavBarUser from "../../user/general/NavBarUser.jsx";
import Typography from "@mui/material/Typography";
import {ToastContainer} from "react-toastify";

export default function Page500() {
    document.title = 'Internal Server Error';
    return(
        <>
            <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',}} >
                <h1 className='text-center'>500 Peticion Incorrecta</h1>
                <p>Lo sentimos, hubo un problema con la peticion que hizo</p>
            </Typography>
            <ToastContainer/>


        </>
    )


}