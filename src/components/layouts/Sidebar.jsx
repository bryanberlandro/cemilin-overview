import { List } from "../elements/List";

/* eslint-disable react/prop-types */
export function Sidebar({showSidebar}){
    return(
        <>
        <div className={`fixed left-0 top-0 h-dvh w-48 px-2 bg-violet-500 transition-all duration-500 pt-16 text-white ${showSidebar ? 'translate-x-0' : '-translate-x-96'}`}>
            <ul>
                <List name={"Home"}/>
                <List name={"Dasbhoard"}/>
                <List name={"Orders"}/>
                <List name={"Products"}/>
                <List name={"To Do"}/>
            </ul>
        </div>
        </>
    )
}