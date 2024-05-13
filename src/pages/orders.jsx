import { useEffect, useState } from "react";
import { FaChevronDown, FaInfoCircle, FaTrash } from "react-icons/fa";
import { Alert } from "../components/fragments/Alert";
import { Navbar } from "../components/layouts/Navbar";
import { Form } from "../components/layouts/orders/Form";
import { Input } from "../components/fragments/Input";
import { ProductCard, ProductLoader } from "../components/fragments/ProductCard";
import { useFetch } from "../hooks/useFetch"
import { StatusBtn } from "../components/elements/StatusBtn";
import { Rupiah } from "../utils/Rupiah";
import { Loader } from "../components/fragments/Loader";
import axios from "axios";
import gsap from "gsap";

const OrdersPage = () => {
    const [success, setSuccess] = useState(false)
    const {data, isLoading, isError} = useFetch("https://cemilin-api.vercel.app/products")
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalChange, setTotalChange] = useState(0)
    const [status, setStatus] = useState("")
    const [paid, setPaid] = useState(0)
    const [name, setName] = useState("")
    const [purchasedDate, setPurchasedDate] = useState("");

    useEffect(() => {
        if(selectedProduct.length > 0){
            gsap.to("#floatDetails", { y: 0, duration: 1, ease: "expo.inOut" });
            return
        }
        gsap.to("#floatDetails", { y: 1000, duration: 3, delay: 1, ease: "expo.inOut" });
    }, [selectedProduct])

    useEffect(() => {
        if(selectedProduct){
            const sumPrice = selectedProduct.reduce((acc, cur) => acc + cur.totalPrice, 0)
            setTotalPrice(sumPrice)
        }
    }, [selectedProduct])

    useEffect(() => {
        setTotalChange(paid - totalPrice)
        console.log(purchasedDate)
    }, [paid, purchasedDate])

    const handleMinProd = (prod) => {
        const existingProductIndex = selectedProduct.findIndex(item => item._id === prod._id);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...selectedProduct];
            if (updatedProducts[existingProductIndex].pieces > 1) {
                updatedProducts[existingProductIndex].pieces -= 1;
                updatedProducts[existingProductIndex].totalPrice -= prod.price;
                setSelectedProduct(updatedProducts);
            } else {
                setSelectedProduct(selectedProduct.filter(item => item._id !== prod._id));
            }
        }
    };
    function sum(dt){
        if(dt.price == 5000){
            const price = dt.price * dt.pieces
            return price
        }
        if(dt.pieces % 2 == 0){
            const price = dt.price * dt.pieces
            return price
        }
        const price = dt.price * dt.pieces + 500;
        return price;
    }

    const handlePlusProd = (prod) => {
        const existingProductIndex = selectedProduct.findIndex(item => item._id === prod._id);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...selectedProduct];
            updatedProducts[existingProductIndex].pieces += 1;
            updatedProducts[existingProductIndex].totalPrice = sum(updatedProducts[existingProductIndex]);
            setSelectedProduct(updatedProducts);
        } else {
        const newProduct = {
            ...prod,
            pieces: 1,
            totalPrice: sum({ ...prod, pieces: 1 })
        };
        setSelectedProduct([...selectedProduct, newProduct]);
        }
    };

    async function handleSendOrder(){
        try{
            const productsToSend = Object.values(selectedProduct).map(product => ({
                name: product.name,
                quantity: product.pieces,
                price: product.totalPrice
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
            setSuccess(true)
        } catch(err){
            console.log(err)
        }
        const timeout = setTimeout(() => {
            setSuccess(false)
        }, 3000)
        return () => clearTimeout(timeout);
    }

    function handleStatus(e){
        setStatus(e)
    }
    function handleShowDetails(){
        setShowDetails(!showDetails)
    }

    return(
        <>
        <Navbar/>
        <div className="pt-nav pb-10 px-[1%]">
            <div className={`bg-white px-5 rounded-lg w-full py-6 ${selectedProduct.length > 0 ? "mb-44" : ""}`}>
                <div className="text-lg font-bold text-violet-500 flex justify-between items-center">
                    <h1>Input Order</h1>
                    <FaTrash/>
                </div>
                <div>
                    <div className="mt-8">
                        <div className="my-3 flex flex-col gap-4">
                            {
                                isLoading ? <ProductLoader/>
                                :
                                data?.map(prod => (
                                    <ProductCard
                                    isLoading={isLoading}
                                        key={prod._id}
                                        img={prod.image}
                                        name={prod.name}
                                        selectedProduct={selectedProduct.find(item => item._id == prod._id)}
                                        minusClick={() => handleMinProd(prod)}
                                        plusClick={() => handlePlusProd(prod)}
                                    />
                                ))
                            }
                        </div>
                        <form className="mt-10">
                            <div className="flex gap-1">
                                <div className="w-1/2">
                                    <Input
                                    htmlFor={"name"}
                                    label={"Name"}
                                    id={"name"}
                                    name={"name"}
                                    placeholder={"john doe"}
                                    type={"text"}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Input
                                    htmlFor={"date"}
                                    label={"Purchase Date"}
                                    id={"date"}
                                    name={"date"}
                                    placeholder={"john doe"}
                                    type={"date"}
                                    onChange={(e) => setPurchasedDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mt-6 gap-2">
                                <p className="text-sm text-neutral-500">Complete ?</p>
                                <div className="flex gap-2">
                                    <StatusBtn handleStatus={handleStatus} status={"completed"} isStatus={status}/>
                                    <StatusBtn handleStatus={handleStatus} status={"pending"} isStatus={status}/>
                                    <StatusBtn handleStatus={handleStatus} status={"canceled"} isStatus={status}/>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-1">
                                <div className="flex flex-col w-1/2 gap-1">
                                    <Input
                                        label={"Total Paid"}
                                        htmlFor={"totalPaid"}
                                        id={"totalPaid"}
                                        name={"totalPaid"}
                                        type={"number"}
                                        placeholder={"Rp. 10.000"}
                                        onChange={(e) => setPaid(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col w-1/2 gap-1">
                                    <p className={`text-sm ${totalPrice > 0 ? "text-violet-400" : "text-neutral-500"}`}>Total Change</p>
                                    <div className={`outline-none border-b-2 ${totalPrice > 0 ? "border-violet-400 font-semibold" : "border-neutral-400 font-normal" }  px-4 py-1`}>
                                        {Rupiah(totalChange)}
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
            <div id="floatDetails" className="fixed bottom-0 rounded-t-2xl shadow-soft px-[5%] py-5 w-full bg-white left-0">
                        <div onClick={handleShowDetails} className="flex items-center gap-2 text-sm font-medium text-violet-500">
                        <FaInfoCircle/>
                        <h1>Click for details</h1>
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
                    <button className="w-full py-3 bg-violet-400 rounded-lg text-white mt-4" onClick={handleSendOrder}>Input Order</button>
            </div>
            <Alert success={success}/>
        </div>
        </>
    )
}


export default OrdersPage;