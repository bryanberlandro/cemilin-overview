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
            <div className={`transition duration-500 fixed ${showSidebar ? "flex" : "hidden"} w-full h-dvh backdrop-blur-[1px] bg-neutral-100 bg-opacity-15 z-[99] ${transition ? "opacity-100" : "opacity-0"}`}></div>
            <div className={`fixed left-0 top-0 h-dvh z-[999] w-48 px-2 bg-violet-500 transition-all duration-500 pt-nav text-white ${showSidebar ? 'translate-x-0' : '-translate-x-96'}`}>
                <ul>
                    <List name={"Home"} linkTo={"/"} onClick={closeSidebar}/>
                    <List name={"Dasbhoard"} linkTo={"/dashboard"} onClick={closeSidebar}/>
                    <List name={"Orders"} linkTo={"/orders"} onClick={closeSidebar}/>
                    <List name={"Products"} linkTo={"/products"} onClick={closeSidebar}/>
                    <List name={"To Do"} linkTo={"/todo"} onClick={closeSidebar}/>
                </ul>
            </div>
        </>
    )
}