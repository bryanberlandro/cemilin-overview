/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export function StatusBtn({status}){
    const [statusColor, setStatusColor] = useState("")

    useEffect(() => {
        if(status == "completed"){
            setStatusColor("bg-violet-400")
        } 
        else if(status == "pending"){
            setStatusColor("bg-yellow-400")
        }
        else if(status == "canceled"){
            setStatusColor("bg-red-400")
        }

    }, [status])

    return(
        <>
        <div className={`${statusColor} px-4 text-[10px] rounded-full py-1 text-white`}>
            <p>{status}</p>
        </div>
        </>
    )
}