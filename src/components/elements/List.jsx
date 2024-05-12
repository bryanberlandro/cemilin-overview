import { Link, useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
export function List({name, linkTo, onClick}){
    const location = useLocation()
    
    return(
        <>
        <Link onClick={onClick} to={linkTo}>
            <li className={`py-3  hover:bg-violet-600 ${location.pathname == linkTo ? "bg-violet-600 text-white" : "text-neutral-200"} px-4 rounded-md cursor-pointer`}>
                {name}
            </li>
        </Link>
        </>
    )
}