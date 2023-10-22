
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ListCompanies from "../../saler/pages/admin/companies/ListCompanies.jsx";
import {handleResponse} from "../../general/HandleResponse.jsx";
import storage from "../../storage/Storage.jsx";
import {profileApi} from "../../apis/QueryAxios.jsx";


export default function GetCompaniesxUsers() {

    const [loading, setLoading] = useState(false)
    const [companies,setCompanies] = useState([])
    const navigate = useNavigate()
    const [users,setUsers] = useState([])


    const getAllCompanies = async (value) =>{
        try
        {
            setLoading(true)
            const response = await profileApi.get('/companies',{
                headers: {
                    'Authorization': `Bearer ${storage.get('authToken')}`
                }})
            setLoading(false)
            setCompanies(response.data.companies)
            setUsers(response.data.users)
        }
        catch(e){
            setLoading(false)
            handleResponse(e,navigate)
        }

    }
    useEffect (() =>{
        getAllCompanies()
    },[])

    return(
        <>
            <ListCompanies
                loading={loading}
                companies={companies}
                users={users}
                setCompanies={setCompanies}
                getAllCompanies={getAllCompanies}
                type_request = 'companies_users'
            />
        </>
    )
}