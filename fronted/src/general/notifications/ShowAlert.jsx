import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alert_succes(mensaje){
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:'Ok',
        icon:'success',
        text:mensaje
    })
}

export function show_alert_warning(mensaje){
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:'Advertencia',
        icon:'warning',
        text:mensaje
    })
}

export function show_alert_danger(mensaje){
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:'Error',
        icon:'error',
        text:mensaje
    })
}
export function alert_time_out(){
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:'Time Out',
        icon:'error',
        text:'Tiempo de Espera Excedido'
    })
}