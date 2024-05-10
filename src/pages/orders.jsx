import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Alert } from "../components/fragments/Alert";
import { Navbar } from "../components/layouts/Navbar";
import { Form } from "../components/layouts/orders/Form";

const OrdersPage = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false)

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://cemilin-api.vercel.app/products")
                setProducts(response.data)
                setLoading(false)
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

    

    return(
        <>
        <Navbar/>
        <div className="pt-nav px-[5%]">
            <div className="bg-white px-5 rounded-lg w-full py-6">
                <div className="text-lg font-bold text-violet-500 flex justify-between items-center">
                    <h1>Input Order</h1>
                    <FaTrash/>
                    
                </div>
                <Form
                    products={products}
                    loading={loading}
                    setSuccess={setSuccess}
                />
            </div>
            <Alert success={success}/>
        </div>
        </>
    )
}

export default OrdersPage;