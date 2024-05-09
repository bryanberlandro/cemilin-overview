import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export function List({name, linkTo}){
    return(
        <>
        <Link to={linkTo}>
            <li className="py-4 hover:bg-violet-600 px-4 rounded-md cursor-pointer">
                {name}
            </li>
        </Link>
        </>
    )
}