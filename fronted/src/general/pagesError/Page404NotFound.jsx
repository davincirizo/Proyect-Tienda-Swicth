import NavBarUser from "../../user/general/NavBarUser.jsx";
import Typography from "@mui/material/Typography";

export default function Page404() {
    document.title = 'Not Found';
    return(
        <>
            <NavBarUser/>
            <Typography sx={{
                top: '40%',
                position: 'absolute',
                left: '40%',}} >
                <h1 className='text-center'>404 - No Encontrado</h1>
                <p>Lo sentimos, no existe el registro buscado</p>
            </Typography>

        </>
    )


}