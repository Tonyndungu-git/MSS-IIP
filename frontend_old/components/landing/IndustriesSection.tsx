"use client";

import { motion } from "framer-motion";
import {
    Factory,
    Zap,
    Car,
    Building2
} from "lucide-react";


const industries = [

{
icon:Car,
title:"Mobility",
description:
"Intelligent EV charging infrastructure, fleet systems and connected transportation networks."
},

{
icon:Zap,
title:"Energy",
description:
"Smart energy systems connecting generation, storage and consumption."
},

{
icon:Factory,
title:"Manufacturing",
description:
"Industrial monitoring, automation and operational intelligence."
},

{
icon:Building2,
title:"Smart Infrastructure",
description:
"Connected assets and intelligent operations for modern cities."
}

];


export default function IndustriesSection(){


return (

<section
className="
py-24
max-w-7xl
mx-auto
px-8
"
>


<h2
className="
text-5xl
font-bold
"
>

Industries We Transform

</h2>


<p
className="
text-xl
text-slate-400
mt-5
max-w-3xl
"
>

MSS-IIP provides one intelligence layer across multiple infrastructure domains.

</p>



<div
className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-6
mt-14
"
>


{
industries.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.title}

initial={{
opacity:0,
scale:0.95
}}

whileInView={{
opacity:1,
scale:1
}}

transition={{
delay:index*0.1
}}

viewport={{
once:true
}}

className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-8
"

>


<Icon
className="
text-cyan-400
w-10
h-10
"
/>


<h3
className="
text-2xl
font-semibold
mt-6
"
>

{item.title}

</h3>


<p
className="
text-slate-400
mt-4
"
>

{item.description}

</p>


</motion.div>


)


})

}


</div>


</section>

)

}