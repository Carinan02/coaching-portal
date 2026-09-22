import { useEffect, useState } from "react";
import type { IEmployee } from "../data/Employee";

const API_BASE =
    "https://musical-goggles-7v9p6jjj6vgv2x6pp-3000.app.github.dev/api";

export function useEmployee(id: number) {
    const [employee, setEmployee] = useState<IEmployee>();

    useEffect(() => {
        if (Number.isNaN(id)) return;

        let cancelled = false;

        async function getEmployeeData() {
            const response = await fetch(`${API_BASE}/employees/${id}`);

            if (response.status === 404) {
                alert("Employee not found");
                return;
            }

            if (!response.ok) {
                alert(`Request failed: ${response.status}`);
                return;
            }

            const data: IEmployee = await response.json();
            if (!cancelled) setEmployee(data);
        }

        getEmployeeData();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return employee;
}