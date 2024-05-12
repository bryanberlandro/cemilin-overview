/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaChevronRight, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loader } from "../../fragments/Loader";
import { OrderCard } from "../../fragments/OrderCard";
import { Rupiah } from "../../../utils/Rupiah";

export function OrdersCard({orderData, loading, handleShowDetails}){
    const [toggle, setToggle] = useState("Today")
    const [totalPayment, setTotalPayment] = useState(0)
    const [dataToday, setDataToday] = useState([])
    const [orderToday, setOrderToday] = useState(0)
    const currentDate = new Date().toLocaleDateString()

    useEffect(() => {
        if(orderData){
            const totalMoney = orderData.reduce((acc, cur) => acc + cur.totalPricePaid, 0)
            setTotalPayment(totalMoney)
        }
    }, [orderData])

    useEffect(() => {
        if(dataToday){
            const totalMoney = dataToday.reduce((acc, cur) => acc + cur.totalPricePaid, 0)
            setOrderToday(totalMoney)
        }
    }, [dataToday])

    function handleShowAll(e){
        setToggle(e.target.innerText)
    }

    async function handleShowToday(e){
        setToggle(e.target.innerText)
    }

    useEffect(() => {
        if(orderData){
            const filterData = orderData.filter(data => new Date(data.purchaseDate).toLocaleDateString() == currentDate)
            setDataToday(filterData)
        }
    }, [orderData, currentDate, toggle])

    function renderedData(){
        if(toggle == "All"){
            return orderData?.slice(0,4).map(order => (
                <OrderCard
                    onClick={() => handleShowDetails(order._id)}
                    key={order._id}
                    data={order}
                />
                ))
        } else {
            if(dataToday.length == 0){
                return <h1 className="text-base my-5 text-neutral-300 font-bold">no data available</h1>
            }
            return dataToday?.map(data => (
                <OrderCard
                    onClick={() => handleShowDetails(data._id)}
                    key={data._id}
                    data={data}
                />
            ))
        }
    }

    return(
        <>
        <div id="#orderContainer" className="mt-8 py-5 px-[5%] bg-white shadow-soft rounded-lg">
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-violet-500 font-bold">Orders</h1>
                        <Link to={"/orders"}>
                            <FaPlusCircle className="text-violet-500 text-xl hover:scale-95"/>
                        </Link>
                    </div>
                    <p className="text-sm text-neutral-500">Track, edit, and review cemilin orders</p>
                </div>
                <div className="rounded-full bg-neutral-100 shadow-soft flex w-max text-sm mt-6 overflow-hidden relative gap-2">
                    <div className={`${toggle == "Today" ? "translate-x-0" : "translate-x-full"} w-1/2 bg-violet-400 absolute rounded-full h-full transition-all duration-300`}></div>
                    <div onClick={handleShowToday} className={`px-5 py-1 ${toggle == "Today" ? "text-white" : "text-neutral-300" } z-10 cursor-pointer`}>
                        <h1>Today</h1>
                    </div>
                    <div onClick={handleShowAll} className={`px-6 py-1 z-10 cursor-pointer ${toggle == "All" ? "text-white" : "text-neutral-300" }`}>
                        <h1>All</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center py-4 mt-2 mb-6">
                    {
                        loading ? 
                        <Loader color={"text-violet-400"}/>
                        :
                        orderData.length == 0 ?
                        (
                            <h1 className="text-base my-5 text-neutral-300 font-bold">no data available</h1>
                        )
                        :
                        renderedData()
                    }
                </div>
                <div className="flex justify-between items-start">
                    <div className="text-sm">
                        <h1 className="text-violet-400">Total Income {toggle == "Today" ? toggle : ""} </h1>
                        {
                            toggle == "Today" ?
                            <p className="text-xl font-semibold">{Rupiah(orderToday)}</p>
                            :
                            <p className="text-xl font-semibold">{Rupiah(totalPayment)}</p>
                        }
                    </div>
                    <div className="flex hover:gap-4 transition-all duration-150 text-sm gap-2 items-center text-violet-400">
                        {
                            toggle == "Today" ?
                            <>
                            <Link to={'/dashboard'}>see all orders</Link>
                            <FaChevronRight/>
                            </>
                            : 
                            <>
                            <Link to={'/dashboard'}>see {orderData?.length > 3 ? orderData.length - 4 : "0"} orders more</Link>
                            <FaChevronRight/>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}