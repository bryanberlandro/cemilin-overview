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
import { Form } from "../components/layouts/orders/Form";

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
            <div className="py-4 px-[5%] fixed text-white bg-violet-500 text-lg font-semibold z-10 w-full">
                <div className="flex items-center gap-8">
                    <Link to={"/dashboard"}>
                    <FaArrowLeft/>
                    </Link>
                    <h1>Order Details</h1>
                </div>
            </div>
            <div className="pt-nav px-[5%]">
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
        </>
    )
}

export default OrderDetailsPage;