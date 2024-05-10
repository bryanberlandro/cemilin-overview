import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import OrdersPage from './pages/orders'
import HomePage from './pages/home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
