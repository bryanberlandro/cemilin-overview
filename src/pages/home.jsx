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
import { Link } from "react-router-dom";
import { OrdersCard } from "../components/layouts/home/OrdersCard";

gsap.registerPlugin(useGSAP);

const HomePage = () => {
    const [orderData, setOrderData] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const [showDetails, setShowDetails] = useState(false)
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
    }, [orderData, showDetails])

    useGSAP(() => {
        gsap.from("#orderContainer", {
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
        if(orderDetails){
            setOrderDetails(null)
            setShowDetails(!showDetails)
            return 
        }
        const selectedOrder = orderData.find(order => order._id == id);
        setOrderDetails(selectedOrder)
        setShowDetails(!showDetails)
    }

    return(
        <>
        <Navbar/>
        <div className="pt-nav pb-10 px-[5%]">
            <Hero orderData={orderData}/>
            <OrdersCard
            loading={loading}
            orderData={orderData}
            handleShowDetails={handleShowDetails}
            />
            <OrderDetails 
            data={orderDetails} 
            showDetails={showDetails} 
            setShowDetails={setShowDetails} 
            onClick={handleShowDetails}
            />
        </div>
        </>
    )
}

export default HomePage;