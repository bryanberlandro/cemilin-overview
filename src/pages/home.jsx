import { FaChevronRight } from "react-icons/fa";
import { Hero } from "../components/layouts/home/Hero";
import { OrderCard } from "../components/fragments/OrderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/fragments/Loader";

const HomePage = () => {
    const [orderData, setOrderData] = useState(null)
    const [productsData, setProductsData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://cemilin-api.vercel.app/buyers")
                setOrderData(response.data)
                setLoading(false)
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://cemilin-api.vercel.app/products")
                setProductsData(response.data)
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return(
        <>
        <div className="pt-nav pb-10 px-[5%]">
            <Hero orderData={orderData}/>
            <div className="mt-8 py-5 px-[5%] bg-white shadow-soft rounded-lg">
                <div>
                    <h1 className="text-xl text-violet-500 font-bold">Orders</h1>
                    <p className="text-sm text-neutral-500">Track, edit, and review cemilin orders</p>
                </div>
                <div className="flex flex-col items-center py-4 gap-3 my-6">
                    {
                        loading ? 
                        <Loader color={"text-violet-400"}/>
                        :
                        orderData?.slice(0,4).map(order => (
                            <OrderCard
                                key={order._id}
                                name={order.name}
                                status={"completed"}
                                item={order.itemName}
                                pieces={order.totalItems}
                                price={order.totalPricePaid}
                            />
                        ))
                    }
                </div>
                <div className="flex justify-between items-start">
                    <div className="text-sm">
                        <h1 className="text-violet-400">Total Orders </h1>
                        <p className="text-xl font-semibold">Rp. 20.000</p>
                    </div>
                    <div className="flex text-sm gap-2 items-center text-violet-400">
                        <a href="">see {orderData?.length - 4} orders more</a>
                        <FaChevronRight/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage;