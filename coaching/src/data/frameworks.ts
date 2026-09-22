export type FrameworkStep = {
    t: string;
    p: string;
};

export const frameworks = {
    Coaching: {
        "4Ds": [
            { t: "Discovery", p: "What was discovered during the session?" },
            { t: "Discussion", p: "What was discussed? Root causes identified?" },
            { t: "Delivery", p: "What was delivered / agreed upon?" },
            { t: "Development", p: "What actions drive development?" }
        ],
        COCO: [
            { t: "Connection", p: "Build rapport — what connection was established?" },
            { t: "Observation", p: "What behaviours or patterns were observed?" },
            { t: "Collaboration", p: "How did you collaborate to find solutions?" },
            { t: "Outcome", p: "What outcomes were agreed upon?" }
        ],
        Drive: [
            { t: "Drive", p: "What is driving the need for this coaching?" },
            { t: "Route", p: "What route / path will be taken to address it?" },
            { t: "Inquire", p: "What questions were asked to deepen understanding?" },
            { t: "Validate", p: "How will success be validated?" },
            { t: "Empower", p: "How will the agent be empowered to sustain improvement?" }
        ],
        Spice: [
            { t: "Facts & Observations", p: "Describe what was observed during the session..." },
            { t: "Root Causing", p: "Describe the specific root cause of the issue..." },
            { t: "Goal Setting & Action Plan", p: "Define the goal and expected outcome..." }
            // { t: "Follow Through", p: "Results and outcomes from follow-up..." } // only visible when editing or viewing
        ],
        "Coach the Champ": [
            { t: "Goals", p: "What goals does the champion want to achieve?" },
            { t: "Identify the Problem", p: "What specific problem was identified?" },
            { t: "Collaboration", p: "How did you collaborate to address the problem?" },
            { t: "Action Plan", p: "Agreed action plan for the champion..." },
            { t: "Help / Follow Up", p: "How will you support and follow up?" }
        ]
    },
    Performance: {
        "Make or Break": [
            { t: "Showcasing Evidence", p: "Present the evidence of underperformance..." },
            { t: "Explore Options", p: "Explore options and root causes together..." },
            { t: "Mutual Agreement", p: "Document the mutual agreement reached..." },
            { t: "Referral", p: "Next steps, referrals, or escalation path..." }
        ],
        PACE: [
            { t: "Plan", p: "What is the performance improvement plan?" },
            { t: "Action", p: "What specific actions are required?" },
            { t: "Commit", p: "What commitments were made by the agent?" },
            { t: "Excel / Exit", p: "Target metrics for excelling or conditions for exit..." }
        ],
        RIDE: [
            { t: "Revisit & Review", p: "Review of previous session, current performance, and areas revisited..." },
            { t: "Impact & Consequences", p: "Describe the impact of observed behaviour and consequences if not addressed..." },
            { t: "Deadline", p: "What the specific target is and when the deadline is?" },
            { t: "Endorsement", p: "Next steps, referrals, or escalation path..." }
        ]
    }
} satisfies Record<string, Record<string, FrameworkStep[]>>;

// Derived types straight from the data — no manual duplication, no union keyof issue.
export type IsessionType = keyof typeof frameworks;

// Union of ALL framework keys across every session type (for typing selectedFramework generically).
export type IFramework = {
    [K in IsessionType]: keyof (typeof frameworks)[K];
}[IsessionType];