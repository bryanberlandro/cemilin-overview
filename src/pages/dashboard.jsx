import React, { useEffect, useState } from "react";
import { Navbar } from "../components/layouts/Navbar";
import axios from "axios";
import { Rupiah } from "../utils/Rupiah";
import { FaChevronDown } from "react-icons/fa";
import { Loader } from "../components/fragments/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DashboardPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState({});
    const [expand, setExpand] = useState(null)

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
                orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
        console.log(groupedData)
        return groupedData;
    };

    const renderOrdersByDate = () => {
        return Object.keys(orderData).map((date, index) => (
            <React.Fragment key={index}>
                <tr className="bg-violet-50">
                    <td colSpan={3}>
                        {date}
                    </td>
                    <td className="flex justify-center items-center">
                        <FaChevronDown onClick={() => handleExpand(date)}/>
                    </td>
                </tr>
                {orderData[date].map((order, idx) => (
                    <tr key={order._id} className={`divide-x-2 divide-violet-100 ${date == expand ? "" : "hidden"}`}>
                        <td>{idx + 1}</td>
                        <td>{order.status ? order.status : "completed"}</td>
                        <td>
                            <h1>{order.name}</h1>
                            <h1>{Rupiah(order.totalPrice)}</h1>
                        </td>
                        <td className="text-violet-500 text-sm text-center">Details</td>
                    </tr>
                ))}
            </React.Fragment>
        )).reverse()
    };

    function handleExpand(id){
        setExpand(id)
    }


    return(
        <>
        <Navbar/>
        <div className="pt-nav px-[5%]">
            <h1 className="font-semibold text-lg">Order Lists</h1>
            <p className="text-violet-400 text-sm">Manage Orders: Edit, Delete, and Review Data</p>
            
            {
                loading ? 
                <div className="mt-8 flex justify-center">
                    <Loader color={"text-violet-400"}/>
                </div>
                :
                (
                    <table id="table" className="mt-8 shadow-soft">
                        <thead>
                            <tr>
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
                        ) 
                
            }
        </div>
        </>
    )
}

export default DashboardPage;