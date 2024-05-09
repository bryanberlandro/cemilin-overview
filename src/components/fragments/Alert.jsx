/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa";

export function Alert({success}){
    return(
        <>
        <div className={`fixed w-full px-[5%] flex justify-center left-0 transition-all duration-300 ${success ? "opacity-100 translate-y-0" : "opacity-100 translate-y-96"}`}>
            <div className="flex bottom-0 w-full gap-2 items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-200" role="alert">
            <FaCheckCircle/>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Inpur Order Succeded!</span> Your data order already submitted
            </div>
            </div>
        </div>
        </>
    )
}