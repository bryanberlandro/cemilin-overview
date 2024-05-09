import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import OrdersPage from "./pages/orders"
import { Navbar } from "./components/layouts/Navbar"

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
