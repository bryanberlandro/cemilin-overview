import React, { useEffect, useState } from "react";
import { Navbar } from "../components/layouts/Navbar";
import axios from "axios";
import { Rupiah } from "../utils/Rupiah";
import { FaChevronDown } from "react-icons/fa";
import { Loader } from "../components/fragments/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { FloatDetails } from "../components/fragments/FloatDetails";

const DashboardPage = () => {
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState({});
    const [expand, setExpand] = useState(null)
    const [detailsId, setDetailsId] = useState(null)
    const [showDetails, setShowDetails] = useState(false)

    useGSAP(() => {
        gsap.from("#table", {
            y: 50,
            opacity: 0,
            duration: 2,
            ease: "expo.inOut"
        })
    }, [loading])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://cemilin-api.vercel.app/buyers');
                const orders = response.data;
                // Kelompokkan data berdasarkan tanggal
                // orders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                const groupedOrders = groupOrdersByDate(orders);
                setOrderData(groupedOrders);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // Fungsi untuk mengelompokkan data berdasarkan tanggal
    const groupOrdersByDate = (orders) => {
        const groupedData = {};
        orders.forEach((order) => {
            const orderDate = new Date(order.purchaseDate).toLocaleDateString();
            if (!groupedData[orderDate]) {
                groupedData[orderDate] = [];
            }
            groupedData[orderDate].push(order);
        });
        return groupedData;
    };

    const renderOrdersByDate = () => {
        return Object.keys(orderData).map((date, index) => (
            <React.Fragment key={index}>
                <tr className="bg-violet-50">
                    <td colSpan={3}>
                        {date}
                    </td>
                    <td className="flex justify-center items-center text-violet-500">
                        <FaChevronDown onClick={() => handleExpand(date)}/>
                    </td>
                </tr>
                {orderData[date].map((order, idx) => (
                    <tr key={order._id} className={`divide-x-2 divide-violet-100 ${date == expand ? "" : "hidden"}`}>
                        <td>{idx + 1}</td>
                        <td>
                            <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${order.status == "pending" ? "bg-yellow-400" : "bg-red-400", order.status == "completed" ? "bg-green-400" : "bg-red-400"}`}></div>
                            {order.name}
                            </div>
                        </td>
                        <td>
                            <h1>{Rupiah(order.totalPrice)}</h1>
                        </td>
                        <td className="text-violet-500 text-sm text-center">
                            <Link onClick={() => handleShowDetails(order._id)}>Detail</Link>
                        </td>
                    </tr>
                ))}
            </React.Fragment>
        )).reverse()
    };


    function handleShowDetails(id){
            setDetailsId(id)
            setShowDetails(true);
    }

    function handleExpand(id){
        setExpand(id)
    }


    return(
        <>
        <Navbar/>
        <div className="pt-nav h-dvh px-[5%] overflow-x-hidden">
            <h1 className="font-semibold text-lg">Order Lists</h1>
            <p className="text-violet-400 text-sm">Manage Orders: Edit, Delete, and Review Data</p>
            
            {
                loading ? 
                <div className="pt-10 h-96 flex justify-center">
                    <Loader color={"text-violet-400"}/>
                </div>
                :
                    <table id="table" className="w-full mt-8 shadow-soft">
                        <thead>
                            <tr className="bg-violet-400 text-white">
                                <th>No</th>
                                <th>Status</th>
                                <th>Orders</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {renderOrdersByDate()}
                        </tbody>
                    </table>
                
            }
            <FloatDetails id={detailsId} setShowDetails={setShowDetails} showDetails={showDetails}/>
        </div>
        </>
    )
}

export default DashboardPage;