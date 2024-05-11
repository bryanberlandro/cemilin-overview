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
    const { data, isLoading, isError } = useFetch("https://cemilin-api.vercel.app/products") 
    const [formData, setFormData] = useState()

    const [buyerData, setBuyerData] = useState(null);
    const [chosenProduct, setChosenProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    
    const [name, setName] = useState("")
    const [totalItems, setTotalItems] = useState("")
    const [totalPrice, setTotalPrice] = useState("")
    const [totalPaid, setTotalPaid] = useState("")
    const [totalChange, setTotalChange] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")

    useGSAP(() => {
        gsap.from("#details-wrapper", {
            y: 1000,
            duration: 3,
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

    function handleEdit(e){
        e.preventDefault()
        const value = e.target.innerText
        if(value == "edit"){
            return setIsEdit(true)
        }
        setFormData({
            name: name || buyerData.name,
            itemName: chosenProduct?.name || buyerData.itemName,
            totalItems: totalItems || buyerData.totalItems,
            totalPrice: totalPrice || buyerData.totalPrice,
            status: status || buyerData.status,
            totalPricePaid: totalPaid || buyerData.totalPricePaid,
            totalChange: totalChange || buyerData.totalChange,
            purchaseDate: purchaseDate ||  buyerData.purchaseDate,
        })
        setIsEdit(false)
    }

    async function handleSubmitData(e){
        e.preventDefault()
        try {
            await axios.patch(`https://cemilin-api.vercel.app/buyers/${id}`, formData)
        } catch(err){
            console.log(err)
        }
    }

    async function handleDeleteData(){
        try {
            await axios.delete(`https://cemilin-api.vercel.app/buyers/${id}`)
            location.href = "/dashboard"
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    function handleStatus(e){
        setStatus(e)
    }

    return(
        <>
        <div className="h-max w-full overflow-x-hidden flex flex-col justify-between relative">
            <div className="py-4 h-dvh px-[5%] text-white bg-gradient-to-b from-violet-500 via-violet-400 to-violet-500 text-lg font-semibold z-10">
                <div className="flex items-center gap-8">
                    <Link to={"/dashboard"}>
                    <FaArrowLeft/>
                    </Link>
                    <h1>Order Details</h1>
                </div>
                <div className="flex justify-center items-center h-[80%]">
                    <h1 className="font-extrabold text-4xl text-violet-500">CEMILIN</h1>
                </div>
            </div>
            <div id="details-wrapper" className="fixed w-full bottom-0 py-7 shadow-soft px-[5%] bg-white z-[99] rounded-t-3xl overflow-x-hidden">
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
                            <form onSubmit={handleSubmitData}>
                                <div className="flex justify-between">
                                    <div className="w-1/3 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Name</label>
                                        <input 
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        defaultValue={buyerData.name} 
                                        className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                    <div>
                                        <h1 className="text-neutral-500 text-sm">Status</h1>
                                        <div className="flex gap-1 py-2">
                                            {
                                            isEdit ?
                                                <>
                                                <StatusBtn handleStatus={handleStatus} isStatus={status} status={"completed"}/>
                                                <StatusBtn handleStatus={handleStatus} isStatus={status} status=  {"pending"}/>
                                                <StatusBtn handleStatus={handleStatus} isStatus={status} status={"canceled"}/>
                                                </>
                                            :
                                            <StatusBtn status={buyerData.status}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-8">
                                    <div className="w-1/2 flex flex-col relative">
                                        <p className="text-neutral-500 text-sm">Item Name</p>
                                        <div
                                        className="py-2 border-b-2 border-violet-200">
                                            {chosenProduct ? chosenProduct.name : buyerData.itemName} 
                                        </div>
                                        <div className={`flex-wrap absolute top-12 bg-white rounded-b-lg shadow-soft px-3 py-4  gap-2 mt-4 ${isEdit && !chosenProduct ? "flex": "hidden"}`}>
                                                <ProdBtn 
                                                isEdit={isEdit}
                                                data={data}  chosenProduct={chosenProduct} setChosenProduct={setChosenProduct}
                                                />
                                        </div>
                                    </div>
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Items</label>
                                        <input 
                                        type="number" 
                                        defaultValue={buyerData.totalItems}
                                        onChange={(e) => setTotalItems(e.target.value)} 
                                        className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-8">
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Paid</label>
                                        <input 
                                        type="text" 
                                        onChange={(e) => setTotalPaid(e.target.value)}
                                        defaultValue={buyerData.totalPricePaid} 
                                        className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                    <div className="w-1/2 flex flex-col">
                                        <label htmlFor="name" className="text-neutral-500 text-sm">Total Change</label>
                                        <input 
                                        type="number" 
                                        onChange={(e) => setTotalChange(e.target.value)}
                                        defaultValue={buyerData.totalChange} 
                                        className="py-2 border-b-2 border-violet-200"/>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                <div className="w-1/2 mt-8 flex flex-col">
                                    <label 
                                    htmlFor="name" className="text-neutral-500 text-sm">Total Price</label>
                                    <input 
                                    type="number" 
                                    onChange={(e) => setTotalPrice(e.target.value)}
                                    defaultValue={buyerData.totalPrice} className="py-2 border-b-2 border-violet-200"/>
                                </div>
                                <div className="w-1/2 mt-8 flex flex-col">
                                    <label 
                                    htmlFor="name" className="text-neutral-500 text-sm">Purchased Date</label>
                                    {
                                        isEdit ? 
                                        <input 
                                        type="date" 
                                        onChange={(e) => setPurchaseDate(e.target.value)}
                                        className="py-2 border-b-2 border-violet-200"/>
                                        :
                                        <input type="text" readOnly value={new Date(buyerData.purchaseDate).toLocaleDateString()} className="py-2 border-b-2 border-violet-200"/>
                                    }
                                </div>

                                </div>
                                <div className="text-white font-semibold text-sm mt-14">
                                    <div className="flex gap-2">
                                        <button onClick={handleEdit} className={`w-1/2 py-2 ${isEdit ? "bg-green-400" : "bg-yellow-400"} rounded-lg shadow-soft`}>{isEdit ? "confirm" : "edit"}</button>
                                        <button onClick={() => handleDeleteData(buyerData._id)} className="w-1/2 py-2 bg-red-400 rounded-lg shadow-soft">Delete</button>
                                    </div>
                                    <button type="submit" disabled={isEdit} className={`w-full py-3 mt-2 ${isEdit ? "cursor-not-allowed bg-neutral-400" : "cursor-pointer bg-green-400"} rounded-lg shadow-soft`}>Update Data</button>
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