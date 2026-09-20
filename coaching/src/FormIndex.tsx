import { EmployeeRepository } from "./data/EmployeeRepository"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const employeeRepository = new EmployeeRepository();

export default function FormIndex(){
    const [selected, setSelected] = useState('');
    const navigate = useNavigate();
    function handleSubmit() {
        if (!selected.trim()) {
            alert('No employee selected');
            return;
        }

        const employee = employeeRepository.findOne(selected);

        if (!employee) {
            alert('Employee not found');
            setSelected('');
            return;
        }

        navigate(`${employee.id}`);
    }
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-slate-50">
            <div className="flex flex-col gap-3">
                <h1 className="text-7xl text-blue-500 font-semibold mb-4">Coach</h1>
                <input 
                    list='employeeRepository' 
                    className="border border-slate-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select employee..."
                    value={selected}
                    onChange={(e)=>setSelected(e.target.value)}
                />
                <datalist id='employeeRepository'>
                  {
                    employeeRepository.findAll().map((e)=><option key={e.id} value={e.fullName} />)
                  }
                   
                </datalist>
                <button 
                    onClick={handleSubmit} 
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded font-medium cursor-pointer transition-all"
                >
                    Search
                </button>
            </div>
        </div>
    )
}
