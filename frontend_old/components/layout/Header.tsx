"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import useUser from "@/hooks/useUser";

import { logoutUser } from "@/services/auth/auth";



export default function Header(){


const {user}=useUser();

const router=useRouter();



async function handleLogout(){

    await logoutUser();

    router.push("/");

}



return(

<header
className="
sticky
top-0
z-50
h-16
border-b
border-slate-800
bg-slate-950/90
backdrop-blur
"
>


<div
className="
h-full
max-w-[1700px]
mx-auto
px-8
flex
items-center
justify-between
"
>



<Link

href="/"

className="
flex
items-center
gap-3
"

>


<img

src="/logo/mss-logo.svg"

className="h-10"

alt="MSS"

/>


<div>

<p className="font-bold">

M Synapses Systems

</p>

<p className="text-xs text-slate-400">

Intelligent Infrastructure Platform

</p>

</div>

</Link>





<nav
className="
hidden
lg:flex
items-center
gap-8
text-sm
"
>

<Link href="/">Home</Link>

<Link href="/dashboard">Platform</Link>

<Link href="/assets">Assets</Link>

<Link href="/analytics">Analytics</Link>

<Link href="/ai">AI</Link>

</nav>






<div
className="
flex
items-center
gap-5
"
>

{

user?

<>

<div
className="
text-right
"
>

<p className="font-medium">

{

user.user_metadata.full_name

??

user.email

}

</p>

<p
className="
text-xs
text-slate-400
"
>

{

user.user_metadata.organization

??

"MSS Organization"

}

</p>

</div>

<button

onClick={handleLogout}

className="
flex
items-center
gap-2
px-4
py-2
rounded-lg
bg-slate-800
hover:bg-slate-700
"

>

<LogOut size={18}/>

Logout

</button>

</>

:

<>

<Link

href="/login"

className="
px-5
py-2
rounded-lg
border
border-slate-700
"

>

Login

</Link>

<Link

href="/register"

className="
bg-cyan-500
text-black
px-5
py-2
rounded-lg
font-semibold
"

>

Start Free

</Link>

</>

}

</div>

</div>

</header>

);

}