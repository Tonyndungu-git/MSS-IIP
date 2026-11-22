'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  Zap,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

import { PlatformButton } from '@/components/auth/PlatformButton';


export function PublicNavbar() {

  const [
    mobileMenuOpen,
    setMobileMenuOpen
  ] = useState(false);



  const navLinks = [
    {
      name: 'Overview',
      href: '#overview'
    },
    {
      name: 'Architecture',
      href: '#architecture'
    },
    {
      name: 'Platform',
      href: '#platform'
    },
  ];



  return (

<header
className="
sticky
top-0
z-50
bg-[#020617]/90
backdrop-blur-md
border-b
border-slate-800/80
"
>


<div
className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
h-16
flex
items-center
justify-between
"
>



{/* Brand */}

<Link
href="/"
className="
flex
items-center
gap-3
group
"
>


<div
className="
w-9
h-9
rounded-md
bg-gradient-to-br
from-cyan-500
to-blue-700
flex
items-center
justify-center
shadow-lg
shadow-cyan-950/50
border
border-cyan-400/40
group-hover:border-cyan-300
transition-colors
"
>

<Zap
className="
w-5
h-5
text-slate-950
"
/>


</div>




<div>


<div
className="
flex
items-center
gap-1.5
"
>


<span
className="
font-mono
text-base
font-black
tracking-wider
text-white
"
>
M SYNAPSES
</span>



<span
className="
text-[10px]
font-mono
px-1.5
py-0.5
rounded
bg-cyan-950
text-cyan-400
border
border-cyan-800
font-bold
"
>
IIP
</span>


</div>



<p
className="
text-[9px]
font-mono
tracking-tight
text-slate-400
uppercase
"
>
Intelligent Infrastructure Platform
</p>



</div>


</Link>







{/* Desktop Navigation */}


<nav
className="
hidden
md:flex
items-center
gap-8
text-xs
font-mono
text-slate-300
"
>


{
navLinks.map((link)=>(

<a
key={link.name}
href={link.href}
className="
hover:text-cyan-400
transition-colors
"
>

{link.name}

</a>

))

}



</nav>







{/* Desktop Actions */}

<div
className="
hidden
sm:flex
items-center
gap-3
"
>


<Link
href="/login"
className="
px-3.5
py-2
rounded-lg
text-xs
font-mono
text-slate-300
hover:text-white
hover:bg-slate-800/80
transition-colors
border
border-transparent
hover:border-slate-700
"
>

Sign In

</Link>




<PlatformButton />



</div>








{/* Mobile Menu Button */}


<div
className="
flex
sm:hidden
"
>


<button

onClick={
()=>setMobileMenuOpen(!mobileMenuOpen)
}

className="
p-2
text-slate-400
hover:text-white
"

>


{
mobileMenuOpen

?

<X className="w-6 h-6"/>

:

<Menu className="w-6 h-6"/>

}


</button>


</div>



</div>








{/* Mobile Menu */}


{
mobileMenuOpen &&

<div
className="
sm:hidden
bg-[#070e20]
border-b
border-slate-800
px-4
py-6
space-y-5
font-mono
text-xs
"
>



<div
className="
flex
flex-col
space-y-3
text-slate-300
"
>


{
navLinks.map((link)=>(


<a

key={link.name}

href={link.href}

onClick={
()=>setMobileMenuOpen(false)
}

className="
py-1
hover:text-cyan-400
"

>

{link.name}

</a>


))

}



</div>






<div
className="
pt-4
border-t
border-slate-800
flex
flex-col
gap-2
"
>



<Link

href="/login"

className="
w-full
text-center
py-2.5
rounded
bg-slate-900
border
border-slate-800
text-slate-300
"

>

Sign In

</Link>





<div
onClick={
()=>setMobileMenuOpen(false)
}
>

<PlatformButton />

</div>




</div>




</div>


}



</header>


);

}