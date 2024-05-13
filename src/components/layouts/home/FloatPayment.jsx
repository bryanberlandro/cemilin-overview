/* eslint-disable react/prop-types */
import { FaInfoCircle } from "react-icons/fa";
import { Rupiah } from "../../../utils/Rupiah";
import { useState } from "react";
import axios from "axios";
import { Alert } from "../../fragments/Alert";
import { Loader } from "../../fragments/Loader"

export function FloatPayment({selectedProduct, totalPrice, totalChange, status, paid, name, purchasedDate
}){
    const [showAlert, setShowAlert] = useState(false)
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false);

    async function handleSendOrder(){
        setLoading(true)
        try{
            const productsToSend = Object.values(selectedProduct).map(product => ({
                name: product.name,
                quantity: product.pieces,
                price: product.totalPrice,
                image: product.image
            }));
            await axios.post('https://cemilin-api.vercel.app/buyers', {
                name: name,
                products: productsToSend,
                totalPrice: totalPrice,
                status: status,
                totalPricePaid: paid,
                totalChange: totalChange,
                purchaseDate: purchasedDate
            })
            setShowAlert(true)
            setLoading(false)
            setErr(false)
        } catch(err){
            console.log(err)
            setShowAlert(true)
            setErr(true)
            setLoading(false)
        }
        const timeout = setTimeout(() => {
            setShowAlert(false)
        }, 3000)
        return () => clearTimeout(timeout);
    }

    function handleShowDetails(){
        setShowDetails(!showDetails)
    }

    return(
        <>
        <div id="floatDetails" className="fixed bottom-0 rounded-t-2xl shadow-soft px-[5%] py-5 w-full bg-white left-0">
                        <div onClick={handleShowDetails} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-violet-500">
                        <FaInfoCircle/>
                        <h1>{showDetails ? "Hide details " : "Click for details"}</h1>
                        </div>
                        <div className={`text-neutral-500 text-sm mt-2 flex-col gap-1 ${showDetails ? "flex" : "hidden"}`}>
                            <div className="flex justify-between items-center">
                                <p>Name</p>
                                <p>{name ? name : ""}</p>
                            </div>
                            <div className="flex justify-between items-start">
                                <p>Item</p>
                                <div className="flex flex-col justify-end text-right">
                                    {
                                        selectedProduct.length > 0 ? 
                                            selectedProduct.map(prod => (
                                                <p key={prod._id}>{prod.name} {prod.pieces} pcs</p>
                                            ))
                                        : 
                                        <p>0</p>
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between">
                                    <p>Total Paid</p>
                                    <p>{paid ? Rupiah(paid) : "Rp 0"}</p>
                            </div>
                                <div className="flex justify-between items-center">
                                    <p>Total Change</p>
                                    <p>{totalChange ? Rupiah(totalChange) : "Rp 0"}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>Purchase Date</p>
                                    <p>{purchasedDate ? purchasedDate : "YYYY-MM-DD"}</p>
                                </div>
                        </div>
                        <div className="flex text-lg text-black font-medium mt-4 justify-between items-center">
                            <p>Total Price</p>
                            <p>{Rupiah(totalPrice)}</p>
                        </div>
                    <button className={`w-full py-3 transition-all duration-150 hover:bg-violet-500 hover:scale-[.98] rounded-lg text-white mt-4 flex justify-center ${loading ? "bg-violet-600 scale-95" : "bg-violet-400"}`} onClick={handleSendOrder}>
                        {
                            loading ?
                            <Loader/>
                            : 
                            "Input Order"
                        }
                    </button>
            </div>
            {
                err ? 
                <Alert showAlert={showAlert} title={"Input Order Failed"} err={err} msg={"please fill all orders"}/>
                : 
                <Alert showAlert={showAlert} title={"Input Order Succeded"} err={err} msg={"your order data already submited"}/>
            }

        </>
    )
}