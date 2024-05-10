/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Rupiah } from "../../../utils/Rupiah";
import { StatusBtn } from "../../elements/StatusBtn";
import { Input } from "../../fragments/Input";
import { Loader } from "../../fragments/Loader";
import axios from "axios";

export function Form({products, loading, setSuccess}){
    const [orderLoad, setOrderLoad] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [optionProduct, setOptionProduct] = useState(null)
    const [optionPrice, setOptionPrice] = useState(0)
    const [status, setStatus] = useState("")

    const [name, setName] = useState("");
    const [chosenProduct, setChosenProduct] = useState();
    const [totalProduct, setTotalProduct] = useState("");
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalChange, setTotalChange] = useState(0);
    const [purchaseDate, setPurchaseDate] = useState(null);

    useEffect(() => {
        const exchange = totalPaid - totalPrice 
        const optionChange = totalPaid - optionPrice
        if(totalPaid == 0 || totalPaid == ""){
            return setTotalChange(0)
        }
        if(optionProduct > 0){
            return setTotalChange(optionChange)
        }
        setTotalChange(exchange)
        
    }, [totalPaid, optionPrice])


    useEffect(() => {
        if(chosenProduct){
            const isCireng = chosenProduct.name.toLowerCase() == "cirens isi ayam suwir"
            if(isCireng){
                return setTotalPrice((chosenProduct.price - 500) * totalProduct)
            }
            setTotalPrice(chosenProduct.price * totalProduct)
        } 
    }, [totalProduct])

    useEffect(() => {
        if(chosenProduct){
            setOptionPrice(chosenProduct.price * optionProduct)
        } 
    }, [optionProduct])

    function handleChooseProd(product){
        const sameProduct = products.find(prod => product._id == prod._id)
        if(sameProduct){
            setChosenProduct(sameProduct)
        }
    }

    async function handleSubmitOrder(e){
        setOrderLoad(true)
        e.preventDefault()
        try {
            await axios.post("https://cemilin-api.vercel.app/buyers", {
                name: name,
                itemName: chosenProduct.name,
                totalItems: totalProduct ? totalProduct : optionProduct,
                totalPrice: totalPrice ? totalPrice : optionPrice,
                status: status,
                totalPricePaid: totalPaid,
                totalChange: totalChange,
                purchaseDate: purchaseDate
            })
            setOrderLoad(false)
            setSuccess(true)
        } catch(err){
            console.log(err)
            setOrderLoad(false)
        }
        const timeout = setTimeout(() => {
            setSuccess(false)
        }, 3000)
        return () => clearTimeout(timeout);
    }

    function handleStatus(e){
        setStatus(e)
    }

    return(
        <>
        <form onSubmit={handleSubmitOrder} className="mt-5 flex flex-col">
                    <div className="flex flex-col gap-1">
                        <Input
                            htmlFor={"name"}
                            label={"Name"}
                            name={"name"}
                            id={"name"}
                            type={"text"}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={"example name"}
                        />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="item" className="text-sm text-neutral-500">Product</label>
                        <p className="text-xs text-violet-400">harga satu porsi !</p>
                        <div className="flex gap-2 flex-wrap pt-2">
                            {
                                loading 
                                ? 
                                    (<>
                                    <div className="w-16 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
                                    <div className="w-24 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
                                    </>)
                                :
                                    products.map(prod => (
                                    <div 
                                    key={prod._id} 
                                    onClick={() => handleChooseProd(prod)} 
                                    className={`rounded-lg border-2 px-4 py-1 text-sm cursor-pointer  hover:border-violet-400 hover:text-violet-500 ${chosenProduct?._id == prod._id ? "border-violet-400 text-violet-500 scale-[.98]" : "border-neutral-400 text-neutral-500"}`}
                                    >
                                        <h1>{prod.name}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex gap-1">
                        <div className="flex flex-col gap-1 w-1/2">
                            <Input
                            htmlFor={"totalProduct"}
                            label={"Total Product"}
                            type={"number"}
                            name={"totalProduct"}
                            id={"totalProduct"}
                            placeholder={"1 porsi"}
                            onChange={(e) => setTotalProduct(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                            <p className={`text-sm ${totalPrice > 0 ? "text-violet-400" : "text-neutral-500"}`}>Total Price</p>
                            <div className={`outline-none border-b-2 ${totalPrice > 0 ? "border-violet-400 font-semibold" : "border-neutral-400 font-normal" }  px-4 py-1`}>
                                {Rupiah(totalPrice)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-1">
                        <div className="flex flex-col gap-1 w-1/2">
                            <Input
                            htmlFor={"optionProduct"}
                            label={"Option Product"}
                            type={"number"}
                            name={"optionProduct"}
                            id={"optionProduct"}
                            placeholder={"1 porsi"}
                            onChange={(e) => setOptionProduct(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                        <Input
                            htmlFor={"optionPrice"}
                            label={"Option Price"}
                            type={"number"}
                            name={"optionPrice"}
                            id={"optionPrice"}
                            placeholder={"Rp 1000"}
                            onChange={(e) => setOptionPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex gap-1">
                        <div className="flex flex-col w-1/2 gap-1">
                            <Input
                                label={"Total Paid"}
                                htmlFor={"totalPaid"}
                                id={"totalPaid"}
                                name={"totalPaid"}
                                type={"number"}
                                placeholder={"Rp. 10.000"}
                                onChange={(e) => setTotalPaid(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/2 gap-1">
                            <p className={`text-sm ${totalPrice > 0 ? "text-violet-400" : "text-neutral-500"}`}>Total Change</p>
                            <div className={`outline-none border-b-2 ${totalPrice > 0 ? "border-violet-400 font-semibold" : "border-neutral-400 font-normal" }  px-4 py-1`}>
                                {Rupiah(totalChange)}
                            </div>
                        </div>
                    </div>
                        <div className="flex flex-col mt-5 gap-1">
                            <Input
                                label={"Purchase Date"}
                                htmlFor={"purchaseDate"}
                                id={"purchaseDate"}
                                name={"purchaseDate"}
                                type={"date"}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col mt-5 gap-1">
                            <p className="text-sm text-neutral-500">Complete ?</p>
                            <div className="flex gap-2">
                                <StatusBtn handleStatus={handleStatus} status={"completed"} isStatus={status}/>
                                <StatusBtn handleStatus={handleStatus} status={"pending"} isStatus={status}/>
                                <StatusBtn handleStatus={handleStatus} status={"canceled"} isStatus={status}/>
                            </div>
                        </div>
                        
                        <button type="submit" className="py-2 mt-10 bg-violet-500 text-white rounded-lg flex justify-center items-center">{orderLoad ? <Loader/> : "Input Order"}</button>
                </form>
        </>
    )
}