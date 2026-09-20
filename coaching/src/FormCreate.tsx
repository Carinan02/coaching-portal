import { useParams } from "react-router-dom"
import { EmployeeRepository } from "./data/EmployeeRepository"

const employeeRepository = new EmployeeRepository();

export default function FormCreate(){
const {user} = useParams()

const employee = employeeRepository.findOne(Number(user));

    return(
        <div className="w-full min-h-screen  p-5 bg-slate-100">
            <div className="w-full min-h-full border border-gray-200 bg-white rounded-lg">
                <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
                    <div className="flex gap-1">
                        <h1 className="text-lg font-semibold text-gray-800">New Coaching Session - </h1>
                        <h1 className="text-lg font-semibold text-gray-800">{employee?.fullName}</h1>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="sessionType">Type</label>
                            <select  id="sessionType" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500">
                                <option value="Coaching">Coaching</option>
                                <option value="Performance">Performance</option>
                            </select>
                        </div>
                        <div>
                            <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="frameworkSelect">Framework / Category</label>
                            <select  id="frameworkSelect" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500">
                                <option value="Coaching">Coaching</option>
                                <option value="Performance">Performance</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="sessionType">Coach name</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm" value="Nico Coach" readOnly />
                        </div>
                        <div>
                            <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="currentDate">Date</label>
                            <input type="date" id="currentDate" value={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-md p-2 text-sm" readOnly/>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
} 