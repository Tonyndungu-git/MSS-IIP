"use client";

import { motion } from "framer-motion";


const products=[

{
title:"EV Infrastructure Intelligence",
description:
"Monitor charging networks, stations and energy flows through intelligent digital twins.",
image:"/images/industries/mobility.png"
},

{
title:"Energy Intelligence",
description:
"Connect renewable energy assets, storage systems and operational analytics.",
image:"/images/industries/energy.png"
},

{
title:"Industrial Intelligence",
description:
"Bring manufacturing and industrial equipment into a unified intelligence layer.",
image:"/images/industries/manufacturing.png"
}

];


export default function ProductsSection(){


return (

<section
className="
py-24
bg-slate-900/50
"
>


<div
className="
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

Solutions Built On MSS-IIP

</h2>


<p
className="
text-slate-400
mt-5
text-xl
"
>

Industry applications powered by one intelligent infrastructure platform.

</p>



<div
className="
grid
lg:grid-cols-3
gap-8
mt-14
"
>


{
products.map((product,index)=>(


<motion.div

key={product.title}

whileHover={{
y:-10
}}

className="
rounded-2xl
overflow-hidden
bg-slate-950
border
border-slate-800
"

>


<img

src={product.image}

alt={product.title}

className="
h-56
w-full
object-cover
"

/>


<div
className="
p-8
"
>


<h3
className="
text-2xl
font-bold
"
>

{product.title}

</h3>


<p
className="
text-slate-400
mt-4
"
>

{product.description}

</p>


</div>


</motion.div>


))

}


</div>


</div>


</section>

)

}