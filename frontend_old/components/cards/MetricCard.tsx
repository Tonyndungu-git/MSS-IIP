import Card from "../ui/Card";

interface MetricCardProps {

    title: string;

    value: string | number;

    unit?: string;

}

export default function MetricCard({

    title,

    value,

    unit,

}: MetricCardProps) {

    return (

        <Card>

            <p className="text-slate-400">

                {title}

            </p>

            <h2
                className="
                    text-4xl
                    font-bold
                    mt-4
                    text-cyan-400
                "
            >

                {value}

                {unit && (
                    <span
                        className="
                            text-lg
                            ml-2
                            text-slate-400
                        "
                    >
                        {unit}
                    </span>
                )}

            </h2>

        </Card>

    );

}