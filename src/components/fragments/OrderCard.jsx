import { StatusBtn } from "../elements/StatusBtn"

/* eslint-disable react/prop-types */
export function OrderCard({name, status, item, pieces, price}){

    return(
        <>
        <div className="rounded-lg bg-neutral-50 cursor-pointer w-full px-5 py-4 hover:scale-[.98] hover:bg-neutral-100 transition-all duration-100">
                            <div className="flex justify-between items-center">
                                <h1 className="font-semibold">{name}</h1>
                                <StatusBtn status={status}/>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div className="text-sm">
                                    <h1 className="text-neutral-500">Item :</h1>
                                    <p className="text-sm">{item} {pieces}pcs</p>
                                </div>
                                <div className="text-sm text-right">
                                    <h1 className="text-neutral-500">Total :</h1>
                                    <p className="font-medium text-sm">Rp. {price}</p>
                                </div>
                            </div>
                        </div>
        </>
    )
}