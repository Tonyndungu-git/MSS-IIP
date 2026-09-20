export default function AuthLayout({
    children,
}:{
    children:React.ReactNode;
}){

    return(

        <main
            className="
            min-h-screen
            bg-slate-950
            text-white
            flex
            items-center
            justify-center
            p-8
            "
        >

            {children}

        </main>

    );

}