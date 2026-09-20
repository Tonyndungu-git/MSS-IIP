import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingShell({
    children
}:{
    children:React.ReactNode
}){

return (

<main
className="
bg-slate-950
text-white
min-h-screen
"
>

<Navbar/>

<div className="
pt-24
"
>

{children}

</div>


<Footer/>

</main>

);

}