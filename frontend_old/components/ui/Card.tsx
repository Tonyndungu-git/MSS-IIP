import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({
    children,
    className = "",
}: CardProps) {
    return (
        <div
            className={`
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                p-6
                shadow-lg
                hover:border-cyan-500/30
                transition-all
                ${className}
            `}
        >
            {children}
        </div>
    );
}