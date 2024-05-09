import { useEffect, useState } from "react";
import { List } from "../elements/List";

/* eslint-disable react/prop-types */
export function Sidebar({showSidebar}){

    const [transition, setTransition] = useState(false);

    useEffect(() => {
        setTransition(true);

        const timeout = setTimeout(() => {
            setTransition(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [showSidebar]);

    return(
        <>
            <div className={`fixed ${showSidebar ? "flex" : "hidden"} w-full h-dvh backdrop-blur-[1px] bg-neutral-100 transition-all duration-150 bg-opacity-5 ${transition ? "opacity-100" : "opacity-100"}`}></div>
            <div className={`fixed left-0 top-0 h-dvh z-[999] w-48 px-2 bg-violet-500 transition-all duration-500 pt-nav text-white ${showSidebar ? 'translate-x-0' : '-translate-x-96'}`}>
                <ul>
                    <List name={"Home"} linkTo={"/"}/>
                    <List name={"Dasbhoard"} linkTo={"/dashboard"}/>
                    <List name={"Orders"} linkTo={"/orders"}/>
                    <List name={"Products"} linkTo={"/products"}/>
                    <List name={"To Do"} linkTo={"/todo"}/>
                </ul>
            </div>
        </>
    )
}