interface LoadingProps {
    message?: string;
}

export default function Loading({
    message = "Loading..."
}: LoadingProps) {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-24
            "
        >

            <div
                className="
                    h-10
                    w-10
                    rounded-full
                    border-4
                    border-cyan-500
                    border-t-transparent
                    animate-spin
                "
            />

            <p className="mt-6 text-slate-400">

                {message}

            </p>

        </div>

    );

}