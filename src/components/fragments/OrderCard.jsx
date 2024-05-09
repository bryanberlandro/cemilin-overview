/* eslint-disable react/prop-types */
export function OrderCard({name, status, item, pieces, price}){
    return(
        <>
        <div className="rounded-lg bg-neutral-50 w-full px-5 py-4 hover:scale-[.98] hover:bg-neutral-100 transition-all duration-100">
                            <div className="flex justify-between items-center">
                                <h1 className="font-semibold text-lg">{name}</h1>
                                <div className="bg-violet-400 px-4 text-xs rounded-full py-1 text-white">
                                    <p>{status}</p>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div className="text-sm">
                                    <h1 className="text-neutral-500">Item :</h1>
                                    <p className="font-medium text-base">{item} {pieces}pcs</p>
                                </div>
                                <div className="text-sm text-right">
                                    <h1 className="text-neutral-500">Total :</h1>
                                    <p className="font-medium text-base">Rp. {price}</p>
                                </div>
                            </div>
                        </div>
        </>
    )
}