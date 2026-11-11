import { ReactNode } from "react";

interface SectionProps {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}

export default function Section({
    title,
    description,
    action,
    children,
}: SectionProps) {
    return (
        <section className="mt-10">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-slate-400 mt-2">
                            {description}
                        </p>
                    )}

                </div>

                {action}

            </div>

            <div className="mt-6">

                {children}

            </div>

        </section>
    );
}