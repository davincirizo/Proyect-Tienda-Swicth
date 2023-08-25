import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'
import VerifyEmail from "./auth/VerifyEmail.jsx";
import ForgotPasswordSet from "./auth/ForgotPasswordSet.jsx";
import ListCategories from './saler/pages/admin/categories/ListCategories';
import ListUsers from './saler/pages/admin/users/ListUsers';
import ListRoles from './saler/pages/admin/roles/ListRoles';
import ListLabels from "./saler/pages/admin/labels/ListLabels.jsx";
import {useEffect} from "react";
import storage from "./storage/Storage.jsx";

function App() {

  useEffect (() =>{
    storage.verify('authToken')
  },[])
  console.log(storage.get('authUser'))
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashboardUser/>}/>
        <Route path='/verify/:id/:hash' element={<VerifyEmail/>}/>
        <Route path='/reset-password/:token' element={<ForgotPasswordSet/>}/>


        <Route path='/saler/dashboardSaler' element={<DashboardSaler/>}/>
        <Route path='/saler/list_categories' element={<ListCategories/>}/>
        <Route path='/saler/list_users' element={<ListUsers/>}/>
        <Route path='/saler/list_roles' element={<ListRoles/>}/>
        <Route path='/saler/list_labels' element={<ListLabels/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
