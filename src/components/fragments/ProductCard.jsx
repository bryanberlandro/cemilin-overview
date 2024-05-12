
/* eslint-disable react/prop-types */
export function ProductCard({img, name, selectedProduct, minusClick, plusClick}){

    return(
        <>
        <div className="bg-white shadow-soft w-full rounded-lg py-4 px-4 flex gap-4">
            <div className="w-44 h-24 rounded-lg relative overflow-hidden shadow-soft">
                <img src={img} alt="" className="absolute object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col justify-between w-full">
                <div>
                    <h1 className="font-medium">{name}</h1>
                    <p className="text-xs text-neutral-400">1 porsi 5000</p>
                </div>
                <div className="flex justify-between  w-full items-center">
                    <div>
                    <p className="text-lg font-semibold">Rp {selectedProduct ? selectedProduct.totalPrice : "0"}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 shadow-soft hover:scale-95 hover:bg-violet-400 hover:text-white rounded-full bg-violet-100" onClick={minusClick}>-</button>
                        <div className="underline underline-offset-2 decoration-violet-500">{selectedProduct ? selectedProduct.pieces : "0"}</div>
                        <button className="px-4 py-2 shadow-soft hover:scale-95 hover:bg-violet-400 hover:text-white rounded-full bg-violet-100" onClick={plusClick}>+</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export function ProductLoader(){
    return(
        <div className="bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse shadow-soft w-full rounded-lg py-4 px-4 flex gap-4">
            <div className="w-44 h-24 bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-300 animate-pulse rounded-lg relative overflow-hidden shadow-soft">
                
            </div>
            <div className="flex flex-col justify-between w-full">
                <div>
                    <h1 className="font-medium bg-gradient-to-br from-neutral-400 via-neutral-300 to-neutral-400 animate-pulse w-20 h-2 rounded-full"></h1>
                    <p className="text-xs bg-gradient-to-br from-neutral-400 via-neutral-300 to-neutral-400 animate-pulse w-10 h-2 rounded-full mt-2"></p>
                </div>
                <div className="flex justify-between  w-full items-center">
                    <div>
                    <p className="text-lg font-semibold bg-gradient-to-br from-neutral-400 via-neutral-300 to-neutral-400 animate-pulse w-20 h-3 rounded-full"></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 shadow-soft bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-300 animate-pulse rounded-full" ></button>
                        <div className="underline underline-offset-2 decoration-violet-500"></div>
                        <button className="w-10 h-10 shadow-soft bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-300 animate-pulse rounded-full" ></button>
                    </div>
                </div>
            </div>
        </div>
    )
}