/* eslint-disable react/prop-types */
import {FaXmark} from "react-icons/fa6"
import { Loader } from "./Loader"
import { useEffect, useState } from "react";
import { Rupiah } from "../../utils/Rupiah";
import axios from "axios";

export function OrderDetails({data, showDetails, setShowDetails, onClick}){
    const [transition, setTransition] = useState(false);
    const [orderLoad, setOrderLoad] = useState(false)


    useEffect(() => {
        const timeout = setTimeout(() => {
            if(showDetails){
                setTransition(true);
            }else {
                setTransition(false);
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [showDetails]);

    async function handleDeleteOrder(id){
        setOrderLoad(true)
        try {
            await axios.delete(`https://cemilin-api.vercel.app/buyers/${id}`)
            setShowDetails(!showDetails)
            setOrderLoad(false)
        } catch(err){
            console.log(err)
            setOrderLoad(false)
        }
    }

    return(
        <div className={`fixed ${showDetails ? "flex" : "hidden"} inset-0 w-full h-dvh backdrop-blur-sm justify-center items-center transition duration-500 bg-opacity-5 bg-neutral-100 ${transition ? "opacity-100" : "opacity-0"}`}>
            {
                !data ? (
                    <div className={`w-80 rounded-lg bg-white shadow-soft px-[5%] h-80 py-5 flex justify-center items-center `}>
                        <Loader color={"text-violet-400"}/>
                    </div>
                )
                : (
                    <div className="w-80 rounded-lg bg-white shadow-soft px-[5%] py-5">
                        <div className="flex justify-between items-start text-lg font-semibold">
                            <div>
                                <h1>Order Details</h1>
                                <h1 className="text-xs text-neutral-500">Order ID : {data._id}</h1>
                            </div>
                            <FaXmark onClick={onClick}/>
                        </div>
                        <div className="pt-8 text-sm">
                            <div className="">
                                <div className="text-sm flex justify-between text-neutral-500 ">
                                    <h1>Status</h1>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                        <h1 className="text-green-500 font-semibold">completed</h1>
                                    </div>
                                </div>
                                <div className="text-sm flex justify-between text-neutral-500">
                                    <h1>Purchased at</h1>
                                    <h1>April, 24 2024</h1>
                                </div>
                                <div className="text-sm flex justify-between text-neutral-500">
                                    <h1>Name</h1>
                                    <h1>{data.name}</h1>
                                </div>
                                <div className="text-sm flex justify-between text-neutral-500">
                                    <h1>Item</h1>
                                    <h1>{data.itemName}</h1>
                                </div>
                                <div className="text-sm flex justify-between text-neutral-500">
                                    <h1>Total Item</h1>
                                    <h1>{data.totalItems} pcs</h1>
                                </div>
                            </div>
                            <div className="pt-5 mt-5 border-t-2 border-neutral-200">
                                <h1 className="font-semibold">Order Summary</h1>
                                <div className="text-[10px] flex justify-between text-neutral-500 mt-1">
                                    <h1>Total Paid</h1>
                                    <h1>{Rupiah(data.totalPricePaid)}</h1>
                                </div>
                                <div className="text-xs flex justify-between text-neutral-500">
                                    <h1>Total Change</h1>
                                    <h1>{Rupiah(data.totalChange)}</h1>
                                </div>
                                <div className="text-sm flex justify-between font-semibold">
                                    <h1>Total Price</h1>
                                    <h1>Rp 10.000</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 mt-8 text-sm">
                            <button className="w-1/2 py-2 bg-yellow-500 text-white rounded-lg">Edit</button>
                            <button className="w-1/2 py-2 bg-red-500 flex justify-center items-center text-white rounded-lg" onClick={()  => handleDeleteOrder(data._id)}>
                            {orderLoad ? <Loader color={"text-white"}/> : "Delete"}
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}