interface EmptyStateProps {

    title: string;

    description: string;

}

export default function EmptyState({

    title,

    description,

}: EmptyStateProps) {

    return (

        <div
            className="
                text-center
                py-20
                border
                border-dashed
                border-slate-700
                rounded-xl
            "
        >

            <h3 className="text-2xl font-semibold">

                {title}

            </h3>

            <p className="text-slate-400 mt-3">

                {description}

            </p>

        </div>

    );

}