"use client";

import Link from "next/link";

import {

LayoutDashboard,

Boxes,

Activity,

Bot,

Wrench,

Bell,

FileBarChart,

Settings

} from "lucide-react";



const items=[

{

title:"Dashboard",

href:"/dashboard",

icon:LayoutDashboard

},

{

title:"Assets",

href:"/assets",

icon:Boxes

},

{

title:"Telemetry",

href:"/telemetry",

icon:Activity

},

{

title:"AI",

href:"/ai",

icon:Bot

},

{

title:"Maintenance",

href:"/maintenance",

icon:Wrench

},

{

title:"Alarms",

href:"/alarms",

icon:Bell

},

{

title:"Reports",

href:"/reports",

icon:FileBarChart

},

{

title:"Settings",

href:"/settings",

icon:Settings

}

];



export default function Sidebar(){

return(

<aside
className="
w-72
bg-slate-950
border-r
border-slate-800
min-h-screen
"
>

<div
className="
px-8
pt-10
pb-6
"
>

<p
className="
text-xs
uppercase
tracking-widest
text-slate-500
"
>

Workspace

</p>

</div>



<nav
className="
flex
flex-col
px-4
gap-1
"
>

{

items.map(item=>{

const Icon=item.icon;

return(

<Link

key={item.href}

href={item.href}

className="
flex
items-center
gap-4
px-5
py-4
rounded-xl
hover:bg-slate-900
transition
"

>

<Icon size={20}/>

{item.title}

</Link>

);

})

}

</nav>

</aside>

);

}