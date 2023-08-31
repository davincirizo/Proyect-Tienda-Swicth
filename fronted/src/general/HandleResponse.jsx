import {alert_time_out, show_alert_danger} from "./notifications/ShowAlert.jsx";
import storage from "../storage/Storage.jsx";



export function handleResponse(response,navigate,setErrors=null,handleClose=null,getItems=null) {

    if (response.message === "Network Error") {
        alert_time_out()
        navigate('/saler/dashboardSaler')
    }
    if(response.response.status == 400) {
        setErrors(response.response.data.errors)
    }
    if (response.response.status === 401) {
        storage.clear()
        show_alert_danger(response.response.data.msg)
        navigate('/')
    }
    if (response.response.status === 403) {
        show_alert_danger(response.response.data.msg)
        navigate('/')
    }
    if (response.response.status == 404) {
        handleClose()
        show_alert_danger(response.message)
        getItems()
    }

}