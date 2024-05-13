/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Rupiah } from "../../../utils/Rupiah";
import { StatusBtn } from "../../elements/StatusBtn";
import { Input } from "../../fragments/Input";
import { ProductCard } from "../../fragments/ProductCard";

export function Form({setName, setPurchasedDate, setPaid, totalPrice, totalChange, handleStatus, isStatus, defaultValue}){

    useEffect(() => {
        console.log(defaultValue)
    }, [defaultValue])

    return(
        <>
        <div className="flex flex-col gap-2">
            {
                defaultValue &&
                defaultValue.products.map(prod => (
                    <ProductCard
                    img={prod.image}
                    name={prod.name}
                    selectedProduct={defaultValue}
                    chosenPieces={prod.quantity}
                    key={prod._id}
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
                                    defaultValue={defaultValue?.name}
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
                                    defaultValue={defaultValue?.purchaseDate}
                                    onChange={(e) => setPurchasedDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mt-6 gap-2">
                                <p className="text-sm text-neutral-500">Complete ?</p>
                                <div className="flex gap-2">
                                    <StatusBtn handleStatus={handleStatus} status={"completed"} isStatus={isStatus}/>
                                    <StatusBtn handleStatus={handleStatus} status={"pending"} isStatus={isStatus}/>
                                    <StatusBtn handleStatus={handleStatus} status={"canceled"} isStatus={isStatus}/>
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
                                        defaultValue={defaultValue?.totalPricePaid}
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
        </>
    )
}