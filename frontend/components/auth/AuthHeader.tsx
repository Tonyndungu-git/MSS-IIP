export default function AuthHeader({
    title,
    subtitle
}:{
    title:string;
    subtitle:string;
}){

    return(

        <>

            <div
                className="
                flex
                items-center
                gap-4
                "
            >

                <img
                    src="/logo/mss-logo.svg"
                    alt="MSS"
                    className="h-12"
                />

                <div>

                    <h1
                        className="
                        text-2xl
                        font-bold
                        "
                    >

                        {title}

                    </h1>

                    <p
                        className="
                        text-slate-400
                        "
                    >

                        {subtitle}

                    </p>

                </div>

            </div>

        </>

    );

}