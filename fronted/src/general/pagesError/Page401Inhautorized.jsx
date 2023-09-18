import NavBarUser from "../../user/general/NavBarUser.jsx";
import Typography from "@mui/material/Typography";

export default function Page401() {
    document.title = 'Inhautorized';
    return(
        <>
        <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',}} >
            <h1 className='text-center'>401 - No autorizado</h1>
                <p>Lo sentimos, no tienes permiso para acceder a esta página.</p>
            </Typography>

        </>
    )


}