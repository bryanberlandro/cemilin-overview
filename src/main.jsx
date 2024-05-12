import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import OrdersPage from './pages/orders'
import HomePage from './pages/home'
import DashboardPage from './pages/dashboard'
import OrderDetailsPage from './pages/orderDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="orders" element={<OrdersPage/>}/>
        {/* <Route path="orders/:id" element={<OrderDetailsPage/>}/> */}
        <Route path="dashboard" element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
