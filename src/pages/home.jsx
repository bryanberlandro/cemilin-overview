import { FaChevronRight, FaPlusCircle } from "react-icons/fa";
import { Hero } from "../components/layouts/home/Hero";
import { OrderCard } from "../components/fragments/OrderCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "../components/fragments/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Rupiah } from "../utils/Rupiah";
import { OrderDetails } from "../components/fragments/OrderDetails";
import { Navbar } from "../components/layouts/Navbar";

gsap.registerPlugin(useGSAP);

const HomePage = () => {
    const [orderData, setOrderData] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const [showDetails, setShowDetails] = useState(false)
    const [totalPayment, setTotalPayment] = useState(0)
    const [productsData, setProductsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const orderContainer = useRef()

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
        console.log(orderData)
        if(orderData){
            const totalMoney = orderData.reduce((acc, cur) => acc + cur.totalPricePaid, 0)
            setTotalPayment(totalMoney)
        }
    }, [orderData])

    useGSAP(() => {
        gsap.from(orderContainer.current, {
            y: 100, // Mulai dari bawah
            opacity: 0, // Opacity awal
            duration: 3.5, // Durasi animasi
            ease: "expo.inOut",
        })
    })

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

    function handleShowDetails(id){
        const selectedOrder = orderData.find(order => order._id == id);
        setOrderDetails(selectedOrder)
        setShowDetails(!showDetails)
    }

    return(
        <>
        <Navbar/>
        <div className="pt-nav pb-10 px-[5%]">
            <Hero orderData={orderData}/>
            <div ref={orderContainer} className="mt-8 py-5 px-[5%] bg-white shadow-soft rounded-lg">
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-violet-500 font-bold">Orders</h1>
                        <FaPlusCircle className="text-violet-500 text-xl"/>
                    </div>
                    <p className="text-sm text-neutral-500">Track, edit, and review cemilin orders</p>
                </div>
                <div className="flex flex-col items-center py-4 gap-3 my-6">
                    {
                        loading ? 
                        <Loader color={"text-violet-400"}/>
                        :
                        orderData?.slice(0,4).map(order => (
                            <OrderCard
                                onClick={() => handleShowDetails(order._id)}
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
                        <p className="text-xl font-semibold">{Rupiah(totalPayment)}</p>
                    </div>
                    <div className="flex hover:gap-4 transition-all duration-150 text-sm gap-2 items-center text-violet-400">
                        <a href="">see {orderData?.length - 4} orders more</a>
                        <FaChevronRight/>
                    </div>
                </div>
            </div>
            <OrderDetails data={orderDetails} showDetails={showDetails}/>
        </div>
        </>
    )
}

export default HomePage;