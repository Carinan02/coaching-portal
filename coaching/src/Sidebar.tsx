
import Navlink from "./Navlink"
export default function Sidebar(){
    return(
        <>
        <aside className="border hidden bg-gray-800 text-white md:flex flex-col">
            <Navlink to ='/form' >Coaching Form</Navlink>
            <Navlink to ='/dashboard'>Coaching Dashboard</Navlink>
            <Navlink to ='/report'>Reports</Navlink>
            <Navlink to ='/carousel'>Carousel </Navlink>
        </aside>
     
        </>
    )
}