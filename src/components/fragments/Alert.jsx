/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export function Alert({showAlert, title, msg, err}){
    const [style, setStyle] = useState("")

    useEffect(() => {
        if(err){
            setStyle("text-red-800 border-red-300 rounded-lg bg-red-200")
            return 
        }
        setStyle("text-green-800 border border-green-300 rounded-lg bg-green-200")
    }, [err])

    return(
        <>
        <div className={`fixed w-full px-[5%] top-0 flex justify-center left-0 transition-all duration-300 ${showAlert ? "opacity-100 translate-y-20" : "opacity-100 -translate-y-96"}`}>
            <div className={`flex bottom-0 w-full gap-2 items-center p-4 mb-4 text-sm ${style}`} role="alert">
            {err ? 
            <FaExclamationCircle/>
            :
            <FaCheckCircle/>
            }
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">{title}!</span> {msg}
            </div>
            </div>
        </div>
        </>
    )
}