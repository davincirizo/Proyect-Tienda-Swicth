import { useState,useEffect } from 'react'
import NavBarSaler from '../../../general/NavBarSale'
import storage from '../../../../storage/Storage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ListCategories() {
    const url = import.meta.env.VITE_BACKEND_URL
    const [categories,setCategories] = useState()
    const navigate = useNavigate()

    useEffect (() =>{
      getAllCategory()
  },[])

  const getAllCategory = async () =>{
    try
      {
      const token = storage.get('authToken')
      const response = await axios.get(`${url}/admin/categories`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setCategories(response.data)
      console.log(categories)
    }
    catch(e){
      navigate('/')
    }
      
  }


  return (
    <>
    <NavBarSaler/>
   
    </>
  )
}

export default ListCategories