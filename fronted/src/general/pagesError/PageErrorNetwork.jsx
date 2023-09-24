import NavBarUser from "../../user/general/NavBarUser.jsx";
import Typography from "@mui/material/Typography";

export default function PageErrorNetwork() {
    document.title = 'Error Network';
    return(
        <>
            <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',}} >
                <h1 className='text-center'>Error Network</h1>
                <p>Lo sentimos, hay problema de conexion, Intentelo mas tarde</p>
            </Typography>

        </>
    )


}