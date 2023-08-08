import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'
import DashboardUser from './user/pages/DashboardUser'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<DashboardUser/>}/>

        <Route path='/dashboardSaler' element={<DashboardSaler/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
