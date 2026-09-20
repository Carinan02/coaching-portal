export default function InputTextSelect({label, for, }){
    return(
                     <div>
                            <label className = "block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="sessionType">Type</label>
                            <select  id="sessionType" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500">
                                <option value="Coaching">Coaching</option>
                                <option value="Performance">Performance</option>
                            </select>
                        </div>
    )
}