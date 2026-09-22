import type { ReactNode } from "react";

export default function Label({htmlFor, children}: {htmlFor: string, children : ReactNode}){
    return(
        <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor= {htmlFor}>{children}</label>
    )
}