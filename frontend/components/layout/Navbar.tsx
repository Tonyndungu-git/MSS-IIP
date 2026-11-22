'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Bell,
  Plus,
  Building2,
  ChevronDown,
  ShieldCheck,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  RadioTower
} from 'lucide-react';


import { AppShell } from '@/components/layout/AppShell';

import { useOrganizations } from '@/hooks/useOrganizations';
import { useAssets } from '@/hooks/useAssets';
import { useHealth } from '@/hooks/useHealth';
import { useSites } from '@/hooks/useSites';

import { CreateAssetModal } from '@/components/assets/CreateAssetModal';

import {
  getStoredUser,
  setStoredUser,
  MSSUser
} from '@/lib/supabase';



export const Navbar: React.FC = () => {


  const router = useRouter();


  const { organizations } = useOrganizations();

  const { assets } = useAssets();

  const { sites } = useSites();

  const { health } = useHealth(15000);



  const [selectedOrg,setSelectedOrg] = useState("");

  const [isModalOpen,setIsModalOpen] = useState(false);

  const [user,setUser] = useState<MSSUser | null>(null);

  const [showUserMenu,setShowUserMenu] = useState(false);

  const [showAlertsDropdown,setShowAlertsDropdown] = useState(false);



  useEffect(()=>{

    const stored = getStoredUser();

    setUser(stored);

  },[]);





  useEffect(()=>{

    if(
      organizations.length > 0 &&
      !selectedOrg
    ){

      setSelectedOrg(
        organizations[0].id
      );

    }

  },[
    organizations,
    selectedOrg
  ]);





  const tenantSites =
    sites.filter(
      site =>
      site.organization_id === selectedOrg
    );




  /**
   * MSS MVP ALERT ENGINE
   * 
   * Later this becomes AI health scoring.
   * For now use actual asset status.
   */

  const alertAssets =
    assets.filter(
      asset =>
        asset.status === "WARNING" ||
        asset.status === "CRITICAL" ||
        asset.status === "OFFLINE"
    );






  const handleLogout = ()=>{

    setStoredUser(null);

    router.push("/");

  };





return (

<header
className="
h-14
bg-[#030816]/95
backdrop-blur
border-b
border-slate-800/90
px-4
sm:px-6
flex
items-center
justify-between
sticky
top-0
z-20
"
>



<div className="flex items-center gap-4">



<div
className="
flex
items-center
gap-2
font-mono
text-xs
"
>


<Building2
className="
w-4
h-4
text-cyan-400
"
/>



<span
className="
hidden
sm:inline
text-[10px]
uppercase
text-slate-500
"
>
Tenant
</span>




<select

value={selectedOrg}

onChange={
e=>setSelectedOrg(e.target.value)
}

className="
bg-slate-900
border
border-slate-800
rounded
px-2.5
py-1
text-xs
text-slate-200
font-mono
"

>


{
organizations.length === 0 ?

<option>
No organizations
</option>


:

organizations.map(
org=>(

<option
key={org.id}
value={org.id}
>
{org.name}
</option>

)

)

}


</select>


</div>







<div
className="
hidden
lg:flex
items-center
gap-2
border-l
border-slate-800
pl-3
text-[11px]
font-mono
"
>


<span
className={`
w-2
h-2
rounded-full

${
health?.status === "ok"
?
"bg-emerald-400"
:
"bg-amber-400"
}

`}
/>



<span
className={
health?.status === "ok"
?
"text-emerald-400"
:
"text-amber-400"
}
>

{
health?.status==="ok"
?
"API ONLINE"
:
"API CHECK"
}

</span>


</div>




</div>








<div className="flex items-center gap-3">





<button

onClick={()=>setIsModalOpen(true)}

disabled={tenantSites.length===0}

className="
flex
items-center
gap-1.5
px-3
py-1.5
rounded
bg-cyan-500/10
border
border-cyan-500/30
text-cyan-300
text-xs
font-mono
disabled:opacity-40
"

>

<Plus
className="w-3.5 h-3.5"
/>

Register Asset

</button>









<div className="relative">


<button

onClick={()=>
setShowAlertsDropdown(
!showAlertsDropdown
)
}

className="
relative
p-2
rounded
bg-slate-900
border
border-slate-800
"

>


<Bell className="w-4 h-4"/>



{
alertAssets.length>0 &&

<span
className="
absolute
-top-1
-right-1
bg-rose-500
rounded-full
text-[9px]
w-4
h-4
flex
items-center
justify-center
"
>

{alertAssets.length}

</span>

}


</button>






{
showAlertsDropdown &&

<div
className="
absolute
right-0
mt-2
w-72
bg-[#070e1e]
border
border-slate-800
rounded
p-3
"
>


{
alertAssets.length===0

?

<div
className="
text-xs
text-slate-400
text-center
font-mono
"
>

<CheckCircle2
className="
mx-auto
text-emerald-400
"
/>

All assets operational

</div>


:

alertAssets.map(
asset=>(

<div
key={asset.id}
className="
border-b
border-slate-800
py-2
"
>


<div
className="
text-rose-400
text-xs
font-mono
"
>

<AlertTriangle
className="inline w-3 h-3"
/>

{asset.name}

</div>


<div
className="
text-[10px]
text-slate-500
"
>

Status:
{asset.status}

</div>


</div>

)

)

}


</div>

}



</div>









<div className="relative">


<button

onClick={()=>
setShowUserMenu(
!showUserMenu
)
}

className="
flex
items-center
gap-2
bg-slate-900
border
border-slate-800
rounded
p-1.5
"

>


<div
className="
w-6
h-6
rounded
bg-cyan-900
text-cyan-300
flex
items-center
justify-center
font-bold
"
>

{
user?.name?.charAt(0)
||
"?"
}

</div>


<span
className="
hidden
lg:inline
text-xs
text-slate-300
"
>

{
user?.name ||
"User"
}

</span>


<ChevronDown
className="w-3 h-3"
/>


</button>





{
showUserMenu &&

<div
className="
absolute
right-0
mt-2
w-56
bg-[#070e1e]
border
border-slate-800
rounded
p-3
"
>


<div
className="
border-b
border-slate-800
pb-2
"
>


<div className="text-white font-bold">
{user?.name}
</div>


<div className="text-xs text-slate-400">
{user?.email}
</div>


<div className="text-[10px] text-cyan-400">
{user?.role}
</div>


</div>




<Link
href="/settings"
className="
flex
gap-2
items-center
text-xs
text-slate-300
py-2
"
>

<ShieldCheck
className="w-3 h-3"
/>

Security

</Link>





<button

onClick={handleLogout}

className="
flex
gap-2
items-center
text-xs
text-rose-400
py-2
"

>

<LogOut
className="w-3 h-3"
/>

Logout

</button>


</div>

}


</div>


</div>


</header>

);


};