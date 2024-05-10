import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import OrdersPage from "./pages/orders"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
