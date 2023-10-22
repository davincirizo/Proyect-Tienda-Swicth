import {companyApi} from "../../../../apis/QueryAxios.jsx";
import storage from "../../../../storage/Storage.jsx";
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import {useEffect, useState} from "react";
import ListCompanies from "./ListCompanies.jsx";
import {useNavigate} from "react-router-dom";


export default function GetCompanies() {

    const [loading, setLoading] = useState(false)
    const [companies,setCompanies] = useState([])
    const navigate = useNavigate()
    const [users,setUsers] = useState([])


    const getAllCompanies = async (value) =>{
        try
        {
            setLoading(true)
            const response = await companyApi.get('/',{
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
                type_request = 'companies'
            />
        </>
    )
}