import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {TokenContextProvider} from "./context/TokenContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <App />
  </TokenContextProvider>,
)
