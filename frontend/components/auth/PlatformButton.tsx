'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";


export function PlatformButton(){

const [loggedIn,setLoggedIn] =
useState(false);


useEffect(()=>{

const user = getStoredUser();

setLoggedIn(!!user);

},[]);



return (

<Link

href={
loggedIn
?
"/dashboard"
:
"/login"
}

className="
px-6
py-3
rounded-lg
bg-cyan-500
text-slate-950
font-bold
font-mono
text-sm
flex
items-center
justify-center
gap-2
"

>

{
loggedIn
?
"Open Dashboard"
:
"Launch Operations Center"
}


<ArrowRight className="w-4 h-4"/>


</Link>

);


}