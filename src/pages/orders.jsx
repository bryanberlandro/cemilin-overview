import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Loader } from "../components/fragments/Loader";
import { Alert } from "../components/fragments/Alert";

const OrdersPage = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderLoad, setOrderLoad] = useState(false)
    const [success, setSuccess] = useState(false)

    const [name, setName] = useState("");
    const [chosenProduct, setChosenProduct] = useState();
    const [totalProduct, setTotalProduct] = useState("");
    const [totalPaid, setTotalPaid] = useState("");
    const [totalChange, setTotalChange] = useState("");
    const [purchaseDate, setPurchaseDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://cemilin-api.vercel.app/products")
                setProducts(response.data)
                setLoading(false)
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

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
                totalItems: totalProduct,
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
        }, 2000)
        return () => clearTimeout(timeout);
    }

    return(
        <>
        <div className="pt-nav px-[5%]">
            <div className="bg-white px-5 rounded-lg w-full py-6">
                <div className="text-lg font-bold text-violet-500 flex justify-between items-center">
                    <h1>Input Order</h1>
                    <FaTrash/>
                </div>
                <form onSubmit={handleSubmitOrder} className="mt-5 flex flex-col">
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="name" className="text-neutral-500 text-sm"
                        >Name
                        </label>
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            name="name" 
                            id="name"
                            className="outline-none border-2 rounded-lg px-4 py-1"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="item" className="text-sm text-neutral-500">Product</label>
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
                    <div className="flex flex-col gap-1 mt-4">
                        <label htmlFor="totalProduct" className="text-sm text-neutral-500">Total Product</label>
                        <input 
                            onChange={(e) => setTotalProduct(e.target.value)}
                            type="number" 
                            name="totalProduct" 
                            id="totalProduct" 
                            className="outline-none border-2 rounded-lg px-4 py-1"
                        />
                    </div>
                    <div className="mt-4 flex gap-1">
                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="totalPaid" className="text-sm text-neutral-500">Total Paid</label>
                            <input 
                                onChange={(e) => setTotalPaid(e.target.value)}
                                type="number" 
                                name="totalPaid" 
                                id="totalPaid" 
                                className="outline-none border-2 rounded-lg px-4 py-1"
                            />
                        </div>
                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="totalChange" className="text-sm text-neutral-500">Total Change</label>
                            <input 
                                onChange={(e) => setTotalChange(e.target.value)}
                                type="number" 
                                name="totalChange" 
                                id="totalChange" 
                                className="outline-none border-2 rounded-lg px-4 py-1"
                            />
                        </div>
                    </div>
                        <div className="flex flex-col mt-4 gap-1">
                            <label htmlFor="purchaseDate" className="text-sm text-neutral-500">Purchase Date</label>
                            <input 
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                type="date" 
                                name="purchaseDate" 
                                id="purchaseDate" 
                                className="outline-none border-2 rounded-lg px-4 py-1"
                            />
                        </div>

                        <button type="submit" className="py-2 mt-10 bg-violet-500 text-white rounded-lg flex justify-center items-center">{orderLoad ? <Loader/> : "Input Order"}</button>
                </form>
            </div>
            <Alert success={success}/>
        </div>
        </>
    )
}

export default OrdersPage;