import Image from "next/image";

import LandingShell from "@/components/landing/LandingShell";


export default function Industries(){


return (

<LandingShell>


<section className="
max-w-7xl
mx-auto
px-6
py-20
">


<h1 className="
text-6xl
font-bold
">

Industries

</h1>


<p className="
mt-5
text-xl
text-slate-400
max-w-3xl
">

One intelligent infrastructure platform.
Multiple industry applications.

</p>




<div className="
grid
md:grid-cols-3
gap-8
mt-16
">


<Card

image="/images/industries/mobility.png"

title="EV Infrastructure Intelligence"

description="Monitor charging networks, stations and energy flows through intelligent digital twins."

/>



<Card

image="/images/industries/energy.png"

title="Energy Intelligence"

description="Connect renewable energy assets, storage systems and operational analytics."

/>



<Card

image="/images/industries/manufacturing.png"

title="Industrial Intelligence"

description="Bring manufacturing and industrial equipment into a unified intelligence layer."

/>


</div>


</section>


</LandingShell>


);

}



function Card({
image,
title,
description
}:{
image:string;
title:string;
description:string;
}){


return (

<div className="
bg-slate-900
border
border-slate-800
rounded-2xl
overflow-hidden
hover:border-cyan-500/50
transition
">


<Image

src={image}

width={800}

height={450}

alt={title}

/>



<div className="p-7">


<h2 className="
text-2xl
font-bold
">

{title}

</h2>



<p className="
mt-4
text-slate-400
">

{description}

</p>


</div>


</div>


)

}