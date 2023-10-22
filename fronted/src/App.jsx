import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'
import VerifyEmail from "./auth/VerifyEmail.jsx";
import ForgotPasswordSet from "./auth/ForgotPasswordSet.jsx";
import ListCategories from './saler/pages/admin/categories/ListCategories';
import ListUsers from './saler/pages/admin/users/ListUsers';
import ListRoles from './saler/pages/admin/roles/ListRoles';
import ListLabels from "./saler/pages/admin/labels/ListLabels.jsx";
import Page401 from "./general/pagesError/Page401Inhautorized.jsx";
import Page403 from "./general/pagesError/Page403Fordibben.jsx";
import Page404 from "./general/pagesError/Page404NotFound.jsx";
import Page500 from "./general/pagesError/Page500.jsx";
import PageErrorNetwork from "./general/pagesError/PageErrorNetwork.jsx";
import SetChangePasswordProfile from "./auth/profile/SetChangePasswordProfile.jsx";
import EmaiVerifieed from "./general/EmailVerified.jsx";
import ListCompanies from "./saler/pages/admin/companies/ListCompanies.jsx";
import Profile from "./auth/profile/Profile.jsx";
import GetCompanies from "./saler/pages/admin/companies/GetCompanies.jsx";
import GetCompaniesxUsers from "./auth/profile/CompaniesUsers.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashboardUser/>}/>
        <Route path='/verify/:id/:hash' element={<VerifyEmail/>}/>
        <Route path='/reset-password/:token' element={<ForgotPasswordSet/>}/>
        <Route path='/change_email/:token' element={<SetChangePasswordProfile/>}/>
        <Route path='/email_verfied' element={<EmaiVerifieed/>}/>



        <Route path='/saler/dashboardSaler' element={<DashboardSaler/>}/>
        <Route path='/saler/list_categories' element={<ListCategories/>}/>
        <Route path='/saler/list_users' element={<ListUsers/>}/>
        <Route path='/saler/list_roles' element={<ListRoles/>}/>
        <Route path='/saler/list_labels' element={<ListLabels/>}/>
        <Route path='/saler/list_companies' element={<GetCompanies/>}/>

        <Route path='/profile/companies' element={<GetCompaniesxUsers/>}/>



        <Route path='/inhautorized_401' element={<Page401/>}/>
        <Route path='/fordibben_403' element={<Page403/>}/>
        <Route path='/not_found_404' element={<Page404/>}/>
        <Route path='/internal_server_error_500' element={<Page500/>}/>
        <Route path='/error_network' element={<PageErrorNetwork/>}/>
          <Route path='/*' element={<Page404/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
