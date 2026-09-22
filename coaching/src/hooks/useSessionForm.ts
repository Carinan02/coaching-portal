import { useState, type ChangeEvent } from "react";
import type { FrameworkStep } from "../data/frameworks";

export function useSessionForm(steps: FrameworkStep[], selectedFramework: string) {
    const [topic, setTopic] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    // Keyed by framework name so switching frameworks doesn't bleed
    // answers into the wrong step, and switching back restores them.
    const [stepAnswers, setStepAnswers] = useState<Record<string, string[]>>({});

    const currentAnswers =
        stepAnswers[selectedFramework] ?? steps.map(() => "");

    function topicOnChange(e: ChangeEvent<HTMLInputElement>) {
        setTopic(e.target.value);
    }

    function filesOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFiles(e.target.files);
    }

    function stepAnswerOnChange(index: number, value: string) {
        setStepAnswers((prev) => {
            const existing = prev[selectedFramework] ?? steps.map(() => "");
            const updated = [...existing];
            updated[index] = value;
            return { ...prev, [selectedFramework]: updated };
        });
    }

    function buildPayload(extra: { sessionType: string; coachName: string; date: string }) {
        return {
            ...extra,
            framework: selectedFramework,
            topic,
            files: files ? Array.from(files) : [],
            steps: steps.map((step, i) => ({
                title: step.t,
                answer: currentAnswers[i] ?? ""
            }))
        };
    }

    return {
        topic,
        files,
        currentAnswers,
        topicOnChange,
        filesOnChange,
        stepAnswerOnChange,
        buildPayload
    };
}