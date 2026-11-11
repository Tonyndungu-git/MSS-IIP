export default function AuthCard({
    children,
}:{
    children:React.ReactNode;
}){

    return(

        <div
            className="
            w-full
            max-w-md
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-10
            shadow-2xl
            "
        >

            {children}

        </div>

    );

}