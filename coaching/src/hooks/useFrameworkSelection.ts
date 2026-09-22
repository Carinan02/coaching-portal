import { useState, type ChangeEvent } from "react";
import { frameworks } from "../data/frameworks";
import type { IsessionType, IFramework, FrameworkStep } from "../data/frameworks";

export function useFrameworkSelection(initial: IsessionType = "Coaching") {
    const [sessionType, setSessionType] = useState<IsessionType>(initial);

    const firstFrameworkOf = (type: IsessionType) =>
        Object.keys(frameworks[type])[0] as IFramework;

    const [selectedFramework, setSelectedFramework] = useState<IFramework>(
        firstFrameworkOf(initial)
    );

    const availableFrameworks: Record<string, FrameworkStep[]> =
        frameworks[sessionType];

    const currentFramework: FrameworkStep[] =
        availableFrameworks[selectedFramework] ?? [];

    function sessionTypeOnChange(e: ChangeEvent<HTMLSelectElement>) {
        const type = e.target.value as IsessionType;
        setSessionType(type);
        setSelectedFramework(firstFrameworkOf(type));
    }

    function frameworkOnChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedFramework(e.target.value as IFramework);
    }

    return {
        sessionType,
        selectedFramework,
        availableFrameworks,
        currentFramework,
        sessionTypeOnChange,
        frameworkOnChange
    };
}