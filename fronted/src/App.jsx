import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'
import Register from './auth/Register'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashboardUser/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/dashboardSaler' element={<DashboardSaler/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
