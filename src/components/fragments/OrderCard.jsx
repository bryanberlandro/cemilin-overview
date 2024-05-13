import { useEffect } from "react"
import { Rupiah } from "../../utils/Rupiah"
import { StatusBtn } from "../elements/StatusBtn"

/* eslint-disable react/prop-types */
export function OrderCard({data, onClick}){

    return(
        <>
        <div onClick={onClick} className=" border-b-2 border-violet-200 bg-neutral-50  cursor-pointer w-full px-5 py-5 hover:scale-[.98] hover:bg-neutral-100 transition-all duration-100">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">{data.name}</h1>
                <StatusBtn status={"completed"}/>
            </div>
            <div className="mt-2 flex justify-between">
                <div className="text-sm">
                    <h1 className="text-neutral-500">Item :</h1>
                    {
                        data.products?.map(prd => (
                            <p key={prd._id} className="text-sm">{prd.name}, {prd.quantity}pcs</p>
                        ))
                    }
                </div>
                <div className="text-sm text-right">
                    <h1 className="text-neutral-500">Total :</h1>
                    <p className="font-medium text-sm">{Rupiah(data.totalPrice)}</p>
                </div>
            </div>
        </div>
        </>
    )
}