"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import useApiWarmup from "@/hooks/useApiWarmup";



export default function DashboardLayout({

children

}:{

children:React.ReactNode;

}){

useApiWarmup();

return(

<div
className="
min-h-screen
bg-slate-950
text-white
"
>

<Header/>

<div
className="
flex
"
>

<Sidebar/>

<main
className="
flex-1
p-10
overflow-auto
"
>

{children}

</main>

</div>

</div>

);

}