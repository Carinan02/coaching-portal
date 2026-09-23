import { useParams } from "react-router-dom";
import { useState, type ChangeEvent, useRef } from "react";
import Label from "./components/Label";
import { frameworks } from "./data/frameworks";
import type { IsessionType } from "./data/frameworks";
import { useEmployee } from "./hooks/useEmployee";
import { useFrameworkSelection } from "./hooks/useFrameworkSelection";

export default function FormCreate() {
    const { user } = useParams();
    const employee = useEmployee(Number(user));
    const coachNameRef = useRef<HTMLInputElement>(null)
    const today = new Date().toISOString().split("T")[0];
    const coachDateRef = useRef<HTMLInputElement>(null)
    const {
        sessionType,
        selectedFramework,
        availableFrameworks,
        currentFramework,
        sessionTypeOnChange,
        frameworkOnChange
    } = useFrameworkSelection();

    // --- Form field state (kept simple, right here, no hook needed yet) ---
    const [topic, setTopic] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    // Answers keyed per-framework so switching frameworks doesn't
    // overwrite or lose what was already typed.
    const [stepAnswers, setStepAnswers] = useState<Record<string, string[]>>({});
    const currentAnswers =
        stepAnswers[selectedFramework] ?? currentFramework.map(() => "");

    function topicOnChange(e: ChangeEvent<HTMLInputElement>) {
        setTopic(e.target.value);
    }

    function filesOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFiles(e.target.files);
    }

    function stepAnswerOnChange(index: number, value: string) {
        setStepAnswers((prev) => {
            const existing = prev[selectedFramework] ?? currentFramework.map(() => "");
            const updated = [...existing];
            updated[index] = value;
            return { ...prev, [selectedFramework]: updated };
        });
    }

    const coach = "202200697";
    

    async function handleSubmit() {
        if (!topic.trim()) {
            alert("Topic is required");
            return;
        }
        const coachee = employee?.employeeID;
        const coachDate = coachDateRef.current?.value;
        const payload = {
            sessionType,
            framework: selectedFramework,
            coach,
            date: today,
            coachDate,
            topic,
            coachee,
            files: files ? Array.from(files) : [],
            steps: currentFramework.map((step, i) => ({
                title: step.t,
                answer: currentAnswers[i] ?? ""
            }))
        };
        const API_BASE = "https://musical-goggles-7v9p6jjj6vgv2x6pp-3000.app.github.dev/api";
        console.log("Submitting:", payload);
            
        const res = await fetch(`${API_BASE}/newcoaching`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload) })
        const response = await res.json()
        alert(response.ok)
    
    }

    return (
        <div className="w-full min-h-screen p-5 bg-slate-100">
            <div className="w-full min-h-full border border-gray-200 bg-white rounded-lg">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
                    <div className="flex gap-1">
                        <h1 className="text-lg font-semibold text-gray-800">
                            New Coaching Session -
                        </h1>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {employee?.name}
                        </h1>
                    </div>
                </div>

                <div className="p-6 space-y-6">

                    {/* Session Type / Framework */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="sessionType">Type</Label>

                            <select
                                id="sessionType"
                                value={sessionType}
                                onChange={sessionTypeOnChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500"
                            >
                                {(Object.keys(frameworks) as IsessionType[]).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="frameworkSelect">Framework / Category</Label>

                            <select
                                id="frameworkSelect"
                                value={selectedFramework}
                                onChange={frameworkOnChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500"
                            >
                                {Object.keys(availableFrameworks).map((framework) => (
                                    <option key={framework} value={framework}>
                                        {framework}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Coach / Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="coachName">Coach name</Label>
                            <input
                                type="text"
                                ref={coachNameRef}
                                id="coachName"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                defaultValue="Nico Coach"
                                readOnly
                            />
                        </div>

                        <div>
                            <Label htmlFor="currentDate">Date</Label>
                            <input
                                type="date"
                                id="currentDate"
                                defaultValue={today}
                                ref = {coachDateRef}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                
                            />
                        </div>
                    </div>

                    {/* Topic */}
                    <div>
                        <Label htmlFor="topic">
                            Topic <span className="text-red-500">*</span>
                        </Label>

                        <input
                            type="text"
                            id="topic"
                            placeholder="Coaching Topic"
                            value={topic}
                            onChange={topicOnChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            required
                        />
                    </div>

                    {/* Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="multiple_files">Upload File</Label>

                            <input
                                type="file"
                                id="multiple_files"
                                multiple
                                onChange={filesOnChange}
                                className="w-full text-slate-600 font-medium text-sm border border-slate-200 rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 file:cursor-pointer file:border-0 file:py-2 file:px-3 file:mr-4 file:bg-gray-100 hover:file:bg-gray-200 file:text-slate-500"
                            />

                            <p className="text-xs text-slate-500 mt-2">
                                Valid file types: .jpg, .png, .PNG, .JPEG, .PDF. File size max: 3 MB
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Framework Steps */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded p-2 text-blue-700 text-xs font-medium">
                            <span>
                                <i className="fa-solid fa-book-open mr-2"></i>
                                {selectedFramework}
                            </span>
                            <span className="text-gray-500">{currentFramework.length}</span>
                        </div>

                        {currentFramework.map((step, i) => (
                            <div key={`${selectedFramework}-${i}`}>
                                <Label htmlFor={`step-${selectedFramework}-${i}`}>
                                    {step.t}
                                </Label>

                                <textarea
                                    id={`step-${selectedFramework}-${i}`}
                                    placeholder={step.p}
                                    value={currentAnswers[i] ?? ""}
                                    onChange={(e) => stepAnswerOnChange(i, e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500"
                                    rows={3}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Save Session
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}