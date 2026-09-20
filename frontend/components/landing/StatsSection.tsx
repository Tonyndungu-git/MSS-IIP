const stats=[

{
value:"24/7",
label:"Infrastructure Monitoring"
},

{
value:"Real-Time",
label:"Asset Intelligence"
},

{
value:"AI Powered",
label:"Operational Insights"
},

{
value:"Unified",
label:"Infrastructure Platform"
}

];


export default function StatsSection(){


return (

<section
className="
py-20
max-w-7xl
mx-auto
px-8
"
>


<div
className="
grid
grid-cols-2
lg:grid-cols-4
gap-6
"
>


{
stats.map(stat=>(

<div
key={stat.label}
className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-8
text-center
"
>


<h3
className="
text-4xl
font-bold
text-cyan-400
"
>

{stat.value}

</h3>


<p
className="
text-slate-400
mt-3
"
>

{stat.label}

</p>


</div>

))

}


</div>


</section>

)

}