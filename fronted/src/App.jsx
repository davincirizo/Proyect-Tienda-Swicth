import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import DashboardSaler from './saler/pages/DashboardSaler'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardSaler/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
