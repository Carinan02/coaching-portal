import { NavLink } from "react-router-dom";
export default function Navlink({to,children} : {to: string, children : string}){
    return (
        <NavLink to = {to} className={({ isActive }) => `p-4 border rounded-md hover:bg-gray-700 ${isActive ? "bg-blue-600 font-bold" : "text-gray-300"}`}>{children}</NavLink>
    )
}