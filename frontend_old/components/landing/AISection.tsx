"use client";

import { motion } from "framer-motion";


export default function AISection(){


return (

<section
className="
py-24
bg-slate-900/60
"
>


<div
className="
max-w-7xl
mx-auto
px-8
grid
lg:grid-cols-2
gap-14
items-center
"
>


<div>


<p
className="
text-cyan-400
uppercase
tracking-widest
"
>

Artificial Intelligence

</p>


<h2
className="
text-5xl
font-bold
mt-5
"
>

From Data Collection
To Intelligent Decisions

</h2>


<p
className="
text-xl
text-slate-400
mt-6
"
>

MSS-IIP applies analytics and AI models to
detect patterns, optimize operations and
predict infrastructure behaviour.

</p>


<div
className="
mt-8
space-y-4
"
>

<div className="
bg-slate-950
border
border-slate-800
rounded-xl
p-5
">

Predictive Maintenance

</div>


<div className="
bg-slate-950
border
border-slate-800
rounded-xl
p-5
">

Anomaly Detection

</div>


<div className="
bg-slate-950
border
border-slate-800
rounded-xl
p-5
">

Operational Optimization

</div>


</div>


</div>



<motion.img

src="/images/ai/intelligence.png"

alt="AI Infrastructure Intelligence"

initial={{
opacity:0,
x:40
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:0.8
}}

className="
rounded-3xl
border
border-slate-800
"
/>


</div>


</section>

)

}