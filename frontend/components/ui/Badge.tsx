interface BadgeProps {
    status: string;
}

export default function Badge({
    status,
}: BadgeProps) {

    const colors = {

        ONLINE:
            "bg-green-500/20 text-green-400",

        OFFLINE:
            "bg-red-500/20 text-red-400",

        WARNING:
            "bg-yellow-500/20 text-yellow-400",

        FAULT:
            "bg-red-700/20 text-red-500",

        CHARGING:
            "bg-cyan-500/20 text-cyan-400",

        IDLE:
            "bg-slate-700 text-slate-300",

    };

    const style =
        colors[
            status as keyof typeof colors
        ] ??
        "bg-slate-700 text-slate-300";

    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                ${style}
            `}
        >

            {status}

        </span>

    );
}