"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Network,
    Activity,
    Brain,
    Database,
    Workflow
} from "lucide-react";


const capabilities = [

    {
        icon: Network,
        title:"Digital Twins",
        description:
        "Create intelligent digital representations of physical infrastructure assets."
    },

    {
        icon: Activity,
        title:"Real-Time Telemetry",
        description:
        "Monitor operational data from connected assets in real time."
    },

    {
        icon: Brain,
        title:"AI Intelligence",
        description:
        "Transform infrastructure data into predictive operational insights."
    },

    {
        icon: Database,
        title:"Unified Data Platform",
        description:
        "Connect industrial data sources through one intelligent platform."
    },

    {
        icon: Workflow,
        title:"Automation",
        description:
        "Enable intelligent workflows and operational decisions."
    },

    {
        icon: Cpu,
        title:"Edge Intelligence",
        description:
        "Process and act on infrastructure data closer to the source."
    }

];


export default function PlatformSection(){


return (

<section
className="
py-24
max-w-7xl
mx-auto
px-8
"
>


<div className="max-w-3xl">

<p
className="
text-cyan-400
uppercase
tracking-widest
"
>

Platform

</p>


<h2
className="
text-5xl
font-bold
mt-4
"
>

One Intelligent Layer
For Every Infrastructure System

</h2>


<p
className="
text-slate-400
text-xl
mt-6
"
>

MSS-IIP connects physical infrastructure,
data systems and artificial intelligence
into a unified operating platform.

</p>

</div>



<div
className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
mt-14
"
>


{
capabilities.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.title}

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:0.5,
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
hover:border-cyan-500/50
transition
"

>


<div
className="
w-12
h-12
rounded-xl
bg-cyan-500/10
flex
items-center
justify-center
"
>

<Icon
className="
text-cyan-400
"
/>

</div>



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
leading-7
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