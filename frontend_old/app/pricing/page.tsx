import LandingShell from "@/components/landing/LandingShell";


export default function Pricing(){


return (

<LandingShell>


<section className="
max-w-6xl
mx-auto
px-6
py-20
">


<h1 className="
text-6xl
font-bold
">

Pricing

</h1>


<p className="
mt-5
text-xl
text-slate-400
">

Flexible deployment models for intelligent infrastructure.

</p>



<div className="
grid
md:grid-cols-2
gap-8
mt-16
">


<PricingCard

title="Starter"

items={[
"Asset monitoring",
"Digital twins",
"Telemetry dashboards"
]}

/>



<PricingCard

title="Enterprise"

items={[
"Multi-site management",
"AI analytics",
"Predictive maintenance",
"Custom integrations"
]}

/>


</div>


</section>


</LandingShell>


)

}



function PricingCard({
title,
items
}:{
title:string;
items:string[];
}){


return (

<div className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-10
">


<h2 className="
text-3xl
font-bold
">

{title}

</h2>


<ul className="
mt-6
space-y-3
text-slate-300
">


{
items.map(item=>(

<li key={item}>
✓ {item}
</li>

))
}


</ul>


</div>


)

}