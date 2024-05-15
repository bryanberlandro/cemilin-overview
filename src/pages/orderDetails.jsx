import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Form } from "../components/layouts/orders/Form";
import { ProductCard } from "../components/fragments/ProductCard";
import { Loader } from "../components/fragments/Loader"

const OrderDetailsPage = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState()

    const [buyerData, setBuyerData] = useState(null);
    const [chosenProduct, setChosenProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [delLoading, setDelLoading] = useState(false)
    const [status, setStatus] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    
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
        setTotalChange(totalPaid - totalPrice)
    }, [totalPaid])

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

    async function handleConfirmDel(){
        setDelLoading(true)
        try {
            await axios.delete(`https://cemilin-api.vercel.app/buyers/${id}`)
            location.href = "/dashboard"
            setIsDelete(true)
            setDelLoading(false)
        } catch(err){
            console.log(err)
        }
        setShowDelete(false)
    }

    function handleCancelDel(){
        setIsDelete(false)
        setShowDelete(false)
    }

    function handleDeleteData(){
        setShowDelete(true)
        gsap.to("#alert-confirm-delete", {
            opacity: 100,
            duration: 1,
            delay: .2,
            ease: "expo.inOut",
        })
    }

    useEffect(() => {
        // console.log(formData)
    }, [formData])

    function handleStatus(e){
        setStatus(e)
    }

    return(
        <>
            <div className="py-4 px-[5%] fixed text-white bg-violet-500 text-lg font-semibold z-20 w-full">
                <div className="flex items-center gap-8">
                    <Link to={"/dashboard"}>
                    <FaArrowLeft/>
                    </Link>
                    <h1>Order Details</h1>
                </div>
            </div>
            <div className="pt-nav px-[5%]">
                <div className="flex flex-col gap-2">
                {
                    buyerData &&
                    buyerData.products.map(prod => (
                        <ProductCard
                        img={prod.image}
                        name={prod.name}
                        chosenProduct={buyerData}
                        chosenPrice={prod.price}
                        chosenPieces={prod.quantity}
                        key={prod._id}
                        />
                    ))
                }
                </div>
                <div className="bg-white shadow-soft px-4 py-4 my-5 rounded-lg ">
                    <Form
                    handleStatus={handleStatus}
                    isStatus={status ? status : buyerData?.status}
                    setName={setName}
                    setPaid={setTotalPaid}
                    setPurchasedDate={setPurchaseDate}
                    totalChange={totalChange ? totalChange : buyerData?.totalChange}
                    totalPrice={setTotalPrice}
                    defaultValue={buyerData}
                    />
                </div>
                <div className="bg-white my-5 py-5 px-4">
                    <h1 className="font-semibold text-xl text-right">Rp {buyerData?.totalPrice}</h1>
                    <div className="w-full flex gap-2 mt-3">
                        <button onClick={handleDeleteData} className="bg-red-500 rounded-lg text-white w-1/2 py-2">
                            Delete
                        </button>
                        <button className="bg-yellow-500 rounded-lg text-white w-1/2 py-2">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            <div id="alert-confirm-delete" className={`fixed inset-0 w-full h-dvh z-10 backdrop-blur-[1px] bg-neutral-900 bg-opacity-20 ${showDelete ? "flex opacity-0" : "hidden opacity-0"} justify-center items-center px-[20%]`}>
                <div className="rounded-lg shadow-soft bg-white py-5 px-5">
                    <div className="text-center text-red-500 flex flex-col items-center gap-1 font-bold">
                        <FaExclamationTriangle className="text-4xl"/>
                        <h1>DELETE ORDERS</h1>
                    </div>
                    <p className="text-sm text-center text-neutral-500 mt-1 ">Are you sure to delete this order ? this order will permanently removed </p>
                    <div className="gap-1 flex mt-8">
                        <button onClick={handleConfirmDel} className="px-4 py-2 hover:scale-[.98] hover:bg-neutral-200 shadow-soft w-1/2 bg-neutral-100 rounded-lg hover:border-2 hover:border-violet-300 flex justify-center items-center">
                            {delLoading ? <Loader color={"text-violet-500"}/> : "Yes" }
                        </button>
                        <button onClick={handleCancelDel} className="px-4 py-2 hover:scale-[.98] shadow-soft w-1/2 bg-neutral-200 rounded-lg border-2 border-violet-300">No</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailsPage;