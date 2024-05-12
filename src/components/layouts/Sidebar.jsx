import { useEffect, useState } from "react";
import { List } from "../elements/List";

/* eslint-disable react/prop-types */
export function Sidebar({showSidebar, closeSidebar}){

    const [transition, setTransition] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(showSidebar){
                setTransition(true);
            }else {
                setTransition(false);
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [showSidebar]);

    return(
        <>
            <div onClick={closeSidebar} className={`transition duration-500 fixed ${showSidebar ? "flex" : "hidden"} w-full h-dvh backdrop-blur-[1px] bg-neutral-100 bg-opacity-15 z-[99] ${transition ? "opacity-100" : "opacity-0"}`}></div>
            <div className={`fixed left-0 top-0 h-dvh z-[999] w-52 px-2 bg-violet-500 shadow-soft transition-all duration-500 pt-nav text-white ${showSidebar ? 'translate-x-0' : '-translate-x-96'}`}>
                <ul>
                    <List name={"Home"} linkTo={"/"} onClick={closeSidebar}/>
                    <div className="my-4 px-4">
                        <h1 className="font-bold">Daily Operations</h1>
                        <div className="mt-1">
                        <List name={"Orders"} linkTo={"/orders"} onClick={closeSidebar}/>
                        <List name={"Tasks"} linkTo={"/tasks"} onClick={closeSidebar}/>
                        </div>
                    </div>
                    <div className="my-4 px-4">
                        <h1 className="font-bold">Management</h1>
                        <div className="mt-1">
                            <List name={"Dasbhoard"} linkTo={"/dashboard"} onClick={closeSidebar}/>
                            <List name={"Products"} linkTo={"/products"} onClick={closeSidebar}/>
                        </div>
                    </div>

                </ul>
            </div>
        </>
    )
}