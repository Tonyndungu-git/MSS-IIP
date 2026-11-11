import LandingShell from "@/components/landing/LandingShell";


export default function Contact(){


return (

<LandingShell>


<section className="
max-w-3xl
mx-auto
px-6
py-20
">


<h1 className="
text-6xl
font-bold
">

Contact MSS

</h1>


<p className="
mt-5
text-xl
text-slate-400
">

Interested in deploying intelligent infrastructure?

</p>



<form className="
mt-12
space-y-5
">


{
[
"Name",
"Company",
"Email"
].map(x=>(

<input

key={x}

placeholder={x}

className="
w-full
bg-slate-900
border
border-slate-700
rounded-xl
px-5
py-4
"

/>

))

}



<textarea

placeholder="Message"

rows={5}

className="
w-full
bg-slate-900
border
border-slate-700
rounded-xl
px-5
py-4
"

/>



<button

className="
bg-cyan-500
text-black
px-8
py-4
rounded-xl
font-semibold
"

>

Request Demo

</button>


</form>


</section>


</LandingShell>

)

}