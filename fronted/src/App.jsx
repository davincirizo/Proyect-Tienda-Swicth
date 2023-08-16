import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'
import VerifyEmail from "./auth/VerifyEmail.jsx";
import ForgotPasswordSet from "./auth/ForgotPasswordSet.jsx";
import ListCategories from './saler/pages/admin/categories/ListCategories';
import ListUsers from './saler/pages/admin/users/ListUsers';




function App() {


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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
