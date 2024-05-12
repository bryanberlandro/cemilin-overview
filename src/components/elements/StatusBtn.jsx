/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export function StatusBtn({status, handleStatus, isStatus}){
    const [statusColor, setStatusColor] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {
        if(isStatus){
            if(isStatus !== status){
                setFilter("grayscale")
            } else {
                setFilter("grayscale-0")
            }
        } else {
            setFilter("grayscale-0")
        }
    }, [isStatus])

    useEffect(() => {
        if(status == "completed"){
            setStatusColor("bg-violet-400")
        } 
        else if(status == "pending"){
            setStatusColor("bg-yellow-400")
        }
        else if(status == "canceled"){
            setStatusColor("bg-red-400")
        } else {
            setStatusColor("bg-neutral-400")
        }

    }, [status])

    return(
        <>
        <div onClick={() => handleStatus(status)} className={`${statusColor} cursor-pointer transition-all duration-150 px-4 ${filter} text-xs rounded-full py-1 text-white`}>
            <p>{status}</p>
        </div>
        </>
    )
}