import { FaHamburger, FaUser } from "react-icons/fa";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)

    function handleShowSidebar(){
        setShowSidebar(!showSidebar)
    }

    return(
        <>
        <div className="fixed flex justify-between z-[9999] text-white px-[5%] top-0 w-full bg-violet-600 py-4">
            <h1 className="font-semibold tracking-wider">CEMILIN</h1>
            <div className="flex items-center gap-6">
                <FaUser/>
                <FaHamburger onClick={handleShowSidebar}/>
            </div>
        </div>
        <Sidebar showSidebar={showSidebar}/>
        </>
    )
}