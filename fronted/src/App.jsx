import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'
import VerifyEmail from "./auth/VerifyEmail.jsx";
import ForgotPasswordSet from "./auth/ForgotPasswordSet.jsx";




function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashboardUser/>}/>
        <Route path='/verify/:id/:hash' element={<VerifyEmail/>}/>
            <Route path='/reset-password/:token' element={<ForgotPasswordSet/>}/>


        <Route path='/dashboardSaler' element={<DashboardSaler/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
