import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { StatusBtn } from "../components/elements/StatusBtn";
import { useFetch } from "../hooks/useFetch";
import ProdBtn from "../utils/ProdBtn";
import { Loader } from "../components/fragments/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const OrderDetailsPage = () => {
    const {id} = useParams()
    const [form, setForm] = useState({
        name: "",
    })
    const [buyerData, setBuyerData] = useState(null);
    const [chosenProduct, setChosenProduct] = useState();
    const { data, isLoading, isError } = useFetch("https://cemilin-api.vercel.app/products") 
    const [loading, setLoading] = useState(true);

    useGSAP(() => {
        gsap.from("#details-wrapper", {
            y: 100,
            duration: 2,
            ease: "expo.inOut"
        })
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`https://cemilin-api.vercel.app/buyers/${id}`)
                setBuyerData(response.data)
                setLoading(false)
            } catch(err){
                console.log(err)
            }
        }

        fetchData()
    }, [buyerData])
    
    return(
        <>
        <div className="h-max w-full flex flex-col justify-between">
            <div className="py-4 h-32 px-[5%] text-white bg-violet-500 text-lg font-semibold">
                <div className="flex items-center gap-8">
                    <Link to={"/dashboard"}>
                    <FaArrowLeft/>
                    </Link>
                    <h1>Order Details</h1>
                </div>
            </div>
            <div id="details-wrapper" className="relative py-7 -mt-10 shadow-soft px-[5%] bg-white z-[99] rounded-t-3xl h-full">
                {
                    loading ?
                    <div className="w-full flex justify-center py-20">
                        <Loader color={"text-violet-400"}/>
                    </div> 
                    : 
                    (
                        <>
                        <div className="flex justify-between text-neutral-400 font-bold">
                            <h1>ORDER ID </h1>
                            <h1>#{buyerData._id.toUpperCase()}</h1>
                        </div>
                        <div className="mt-10 overflow-x-hidden h-full">
                            <form>
                                <div className="flex justify-between">
                                    <div className="w-1/3 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Name</label>
                                        <input type="text" value={buyerData.name} className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                    <div>
                                        <h1 className="text-neutral-500 text-sm">Status</h1>
                                        <div className="flex gap-1 py-2">
                                            <StatusBtn status={"completed"}/>
                                            <StatusBtn status={"pending"}/>
                                            <StatusBtn status={"canceled"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-8">
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Item Name</label>
                                        <input type="text" value={buyerData.itemName} className="py-2 border-b-2 border-violet-200"/>
                                        <div className="flex-wrap gap-2 mt-4 hidden">
                                                <ProdBtn 
                                                data={data}  chosenProduct={chosenProduct} setChosenProduct={setChosenProduct}
                                                />
                                        </div>
                                    </div>
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Items</label>
                                        <input type="number" value={buyerData.totalItems} className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-8">
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Paid</label>
                                        <input type="text" value={buyerData.totalPricePaid} className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Change</label>
                                        <input type="number" value={buyerData.totalChange} className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                </div>
                                <div className="w-1/2 mt-8 flex flex-col">
                                    <label 
                                    htmlFor="name" className="text-neutral-500 text-sm">Total Price</label>
                                    <input type="number" value={buyerData.totalPrice} className="py-2 border-b-2 border-violet-200"/>
                                </div>
                                <div className="text-white font-semibold text-sm mt-14">
                                    <div className="flex gap-2">
                                        <button className="w-1/2 py-2 bg-yellow-400 rounded-lg shadow-soft">Edit</button>
                                        <button className="w-1/2 py-2 bg-red-400 rounded-lg shadow-soft">Delete</button>
                                    </div>
                                    <button className="w-full py-3 mt-2 bg-green-400 rounded-lg shadow-soft">Confirm</button>
                                </div>
                            </form>
                        </div>
                        </>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default OrderDetailsPage;