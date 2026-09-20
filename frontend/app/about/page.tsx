import LandingShell from "@/components/landing/LandingShell";


export default function About(){


return (

<LandingShell>


<section className="
max-w-5xl
mx-auto
px-6
py-20
">


<h1 className="
text-6xl
font-bold
">

About MSS

</h1>


<p className="
mt-6
text-xl
text-slate-400
">

M Synapses Systems builds intelligent infrastructure platforms that connect physical assets, operational data and AI decision systems.

</p>



<div className="
mt-12
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

Our Vision

</h2>


<p className="
mt-5
text-slate-300
">

Transform infrastructure from isolated equipment into intelligent connected systems.

</p>


<div className="
grid
md:grid-cols-3
gap-5
mt-10
">


{
[
"Digital Twins",
"Industrial IoT",
"AI Optimization",
"Data Intelligence",
"Financial Decision Models"
].map(x=>(

<div
key={x}
className="
bg-slate-950
rounded-xl
p-5
"
>

{x}

</div>

))
}


</div>


</div>


</section>


</LandingShell>

)

}