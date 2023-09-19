import storage from "../storage/Storage.jsx";



export function handleResponse(response,navigate,setErrors=null) {
    console.log(response)
    if (response.message === "Network Error") {
        navigate('/error_network')
    }
    if(response.response.status == 400) {
        setErrors(response.response.data.errors)
    }
    if (response.response.status === 401) {
        storage.clear()
        navigate('/inhautorized_401')
    }
    if (response.response.status === 403) {
        navigate('/fordibben_403')
    }
    if (response.response.status == 404) {
       navigate('/not_found_404')
    }
    if(response.response.status == 500) {
        navigate('/internal_server_error_500')
    }

}